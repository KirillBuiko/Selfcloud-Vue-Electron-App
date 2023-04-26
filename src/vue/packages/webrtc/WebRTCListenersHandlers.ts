import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {WebRTCConnectionData} from "@/types/WebRTCTypes";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export abstract class WebRTCListenersHandlers {
    protected constructor(protected deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions) {
    }

    attachListeners(connection: WebRTCConnectionData) {
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

    abstract onDataChannelHandler(event: RTCDataChannelEvent, connection: WebRTCConnectionData): void;

    abstract onConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionData): void;

    abstract onIceConnectionStateChangeHandler(event: Event, connection: WebRTCConnectionData): void;

    abstract onIceGatheringStateChangeHandler(event: Event, connection: WebRTCConnectionData): void;

    abstract onNegotiationNeededHandler(event: Event, connection: WebRTCConnectionData): void;

    abstract onIceCandidateHandler(event: RTCPeerConnectionIceEvent, connection: WebRTCConnectionData): void;

    onTrackHandler(event: Event, connection: WebRTCConnectionData): void {
        console.log(`Track with connection ${connection.fingerprint}`);
    }

    onIceCandidateErrorHandler(event: Event, connection: WebRTCConnectionData): void {
        console.log(`Error with ice candidate with connection ${connection.fingerprint}`);
    }

    onSignalingStateChangeHandler(event: Event, connection: WebRTCConnectionData): void {
        console.log(`Signalling state with connection ${connection.fingerprint}: 
        ${connection.connectionHandle.signalingState}`);
    }
}