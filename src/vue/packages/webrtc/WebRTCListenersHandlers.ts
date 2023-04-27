import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {WebRTCConnectionClass} from "@/packages/webrtc/WebRTCConnectionClass";

export abstract class WebRTCListenersHandlers {
    protected constructor(protected deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions) {
    }

    attachListeners(connection: WebRTCConnectionClass) {
        // Added DataChannel to connection
        connection.connectionHandle.addEventListener("datachannel", (event) =>
            this.onDataChannelHandler(event, connection));
        // Connection state changed
        connection.connectionHandle.addEventListener("connectionstatechange", (event) =>
            this.onConnectionStateChangeHandler(event, connection));
        // ?
        connection.connectionHandle.addEventListener("track", (event) =>
            this.onTrackHandler(event, connection));
        // ?
        connection.connectionHandle.addEventListener("iceconnectionstatechange", (event) =>
            this.onIceConnectionStateChangeHandler(event, connection));
        // ?
        connection.connectionHandle.addEventListener("icegatheringstatechange", (event) =>
            this.onIceGatheringStateChangeHandler(event, connection));
        // New candidate has added
        connection.connectionHandle.addEventListener("icecandidate", (event) =>
            this.onIceCandidateHandler(event, connection));
        // Ice negotiation error
        connection.connectionHandle.addEventListener("icecandidateerror", (event) =>
            this.onIceCandidateErrorHandler(event, connection));
        // Need to send new offer
        connection.connectionHandle.addEventListener("negotiationneeded", (event) =>
            this.onNegotiationNeededHandler(event, connection));
        // Signaling state changed
        connection.connectionHandle.addEventListener("signalingstatechange", (event) =>
            this.onSignalingStateChangeHandler(event, connection));
    }

    abstract onDataChannelHandler(event: RTCDataChannelEvent, connection: WebRTCConnectionClass): void;

    abstract onConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void;

    abstract onIceConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void;

    abstract onIceGatheringStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void;

    abstract onNegotiationNeededHandler(event: Event, connection: WebRTCConnectionClass): void;

    abstract onIceCandidateHandler(event: RTCPeerConnectionIceEvent, connection: WebRTCConnectionClass): void;

    onTrackHandler(event: Event, connection: WebRTCConnectionClass): void {
        console.log(`Track with connection ${connection.fingerprint}`);
    }

    onIceCandidateErrorHandler(event: Event, connection: WebRTCConnectionClass): void {
        console.log(`Error with ice candidate with connection ${connection.fingerprint}`);
    }

    onSignalingStateChangeHandler(event: Event, connection: WebRTCConnectionClass): void {
        connection.states.signalingState = connection.connectionHandle.signalingState;
        console.log(`Signalling state with connection ${connection.fingerprint}: 
        ${connection.connectionHandle.signalingState}`);
    }
}