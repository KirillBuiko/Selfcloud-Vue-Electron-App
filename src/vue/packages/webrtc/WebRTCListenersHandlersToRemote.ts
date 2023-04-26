import {WebRTCListenersHandlers} from "@/packages/webrtc/WebRTCListenersHandlers";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {WebRTCConnectionData} from "@/types/WebRTCTypes";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export class WebRTCListenersHandlersToRemote extends WebRTCListenersHandlers {
    constructor(deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions) {
        super(deps);
    }

    onConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionData): void {
        // TODO: Set connection status to remote vds
        // Open/Close Data Channel
        console.log(`Connection state with connection to remote ${connection.fingerprint}: 
        ${connection.connectionHandle.connectionState}`);

        this.deps.virtualDiskWorkerActions.getAllRemoteVirtualDisks().forEach(vd => {
            if(vd.getConfig().fingerprint === connection.fingerprint)
                vd.setRemoteConnected(connection.connectionHandle.connectionState === "connected");
        })
    }

    onDataChannelHandler(event: RTCDataChannelEvent, connection: WebRTCConnectionData): void {
        // TODO: Add Data Channel
        console.log(`Datachannel with connection to remote ${connection.fingerprint}`);
    }

    onIceConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionData): void {
        console.log(`Ice connection with connection to remote ${connection.fingerprint}: 
        ${connection.connectionHandle.iceConnectionState}`);
    }

    onIceGatheringStateChangeHandler(event: Event, connection: WebRTCConnectionData): void {
        console.log(`Ice gathering with connection to remote ${connection.fingerprint}: 
        ${connection.connectionHandle.iceGatheringState}`);
    }

    onNegotiationNeededHandler(event: Event, connection: WebRTCConnectionData): void {
        // TODO: Create new connection offer
        console.log(`Ice candidate with connection to remote ${connection.fingerprint}`);
    }

    onIceCandidateHandler(event: RTCPeerConnectionIceEvent, connection: WebRTCConnectionData): void {
        console.log(`Ice candidate with connection to remote ${connection.fingerprint}`);
        if (event.candidate)
            this.deps.socketEmitActions.toRemoteIceCandidateReady(connection.fingerprint, event.candidate.candidate);
    }
}

export type $WebRTCListenersHandlersToRemote = { webrtcListenersHandlersToRemote: WebRTCListenersHandlersToRemote }
