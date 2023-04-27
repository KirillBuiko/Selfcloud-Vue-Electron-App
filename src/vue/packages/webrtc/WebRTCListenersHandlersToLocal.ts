import {WebRTCListenersHandlers} from "@/packages/webrtc/WebRTCListenersHandlers";
import type {$WebRTCWorkerActions} from "../socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {WebRTCConnectionClass} from "@/packages/webrtc/WebRTCConnectionClass";

export class WebRTCListenersHandlersToLocal extends WebRTCListenersHandlers {
    constructor(deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions) {
        super(deps);
    }

    onConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void {
        connection.states.connectionState = connection.connectionHandle.connectionState;
        console.log(`Connection state with connection to local ${connection.fingerprint}: 
        ${connection.connectionHandle.connectionState}`);
        // TODO: Nothing
    }

    onDataChannelHandler(event: RTCDataChannelEvent, connection: WebRTCConnectionClass): void {
        // TODO: Add DataChannel
        console.log(`Datachannel with connection to local ${connection.fingerprint}`);
    }

    onIceConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void {
        connection.states.iceConnectionState = connection.connectionHandle.iceConnectionState;
        console.log(`Ice connection with connection to local ${connection.fingerprint}: 
        ${connection.connectionHandle.iceConnectionState}`);
    }

    onIceGatheringStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void {
        connection.states.iceGatheringState = connection.connectionHandle.iceGatheringState;
        console.log(`Ice gathering with connection to local ${connection.fingerprint}: 
        ${connection.connectionHandle.iceGatheringState}`);
    }

    onNegotiationNeededHandler(event: Event, connection: WebRTCConnectionClass): void {
        console.log(`Ice candidate with connection to local ${connection.fingerprint}`);
        // TODO: Nothing
    }

    onIceCandidateHandler(event: RTCPeerConnectionIceEvent, connection: WebRTCConnectionClass): void {
        console.log(`Ice candidate with connection to local ${connection.fingerprint}`);
        if (event.candidate)
            this.deps.socketEmitActions.toLocalIceCandidateReady(connection.fingerprint, event.candidate.candidate);
    }
}

export type $WebRTCListenersHandlersToLocal = { webrtcListenersHandlersToLocal: WebRTCListenersHandlersToLocal }
