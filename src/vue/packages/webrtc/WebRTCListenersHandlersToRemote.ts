import {WebRTCListenersHandlers} from "@/packages/webrtc/WebRTCListenersHandlers";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {WebRTCConnectionClass} from "@/packages/webrtc/WebRTCConnectionClass";

export class WebRTCListenersHandlersToRemote extends WebRTCListenersHandlers {
    constructor(deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions) {
        super(deps);
    }

    onConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void {
        connection.states.connectionState = connection.connectionHandle.connectionState;
        // TODO: Set connection status to remote vds
        // Open/Close Data Channel
        console.log(`Connection state with connection to remote ${connection.fingerprint}: 
        ${connection.connectionHandle.connectionState}`);

        this.deps.virtualDiskWorkerActions.getAllRemoteVirtualDisks().forEach(vd => {
            if(vd.getConfig().fingerprint === connection.fingerprint)
                vd.setRemoteConnected(connection.connectionHandle.connectionState === "connected");
        })
    }

    onDataChannelHandler(event: RTCDataChannelEvent, connection: WebRTCConnectionClass): void {
        // TODO: Add Data Channel
        console.log(`Datachannel with connection to remote ${connection.fingerprint}`);
    }

    onIceConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void {
        connection.states.iceConnectionState = connection.connectionHandle.iceConnectionState;
        console.log(`Ice connection with connection to remote ${connection.fingerprint}: 
        ${connection.connectionHandle.iceConnectionState}`);
    }

    onIceGatheringStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void {
        connection.states.iceGatheringState = connection.connectionHandle.iceGatheringState;
        console.log(`Ice gathering with connection to remote ${connection.fingerprint}: 
        ${connection.connectionHandle.iceGatheringState}`);
    }

    onNegotiationNeededHandler(event: Event, connection: WebRTCConnectionClass): void {
        // TODO: Create new connection offer
        console.log(`Ice candidate with connection to remote ${connection.fingerprint}`);
    }

    onIceCandidateHandler(event: RTCPeerConnectionIceEvent, connection: WebRTCConnectionClass): void {
        console.log(`Ice candidate with connection to remote ${connection.fingerprint}`);
        if (event.candidate)
            this.deps.socketEmitActions.toRemoteIceCandidateReady(connection.fingerprint, event.candidate);
    }
}

export type $WebRTCListenersHandlersToRemote = { webrtcListenersHandlersToRemote: WebRTCListenersHandlersToRemote }
