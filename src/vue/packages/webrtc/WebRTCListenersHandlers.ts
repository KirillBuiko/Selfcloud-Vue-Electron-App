import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";

export abstract class WebRTCListenersHandlers{
    protected constructor(private deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions){}

    attachListeners(connection: RTCPeerConnection, fingerprint: string){
        // Added DataChannel to connection
        connection.addEventListener("datachannel", (event) =>
            this.onDataChannelHandler(event));
        // Connection state changed
        connection.addEventListener("connectionstatechange", (event) =>
            this.onConnectionStateChangeHandler(event));
        // ?
        connection.addEventListener("track", (event) =>
            this.onTrackHandler(event));
        // ?
        connection.addEventListener("iceconnectionstatechange", (event) =>
            this.onIceConnectionStateChangeHandler(event));
        // ?
        connection.addEventListener("icegatheringstatechange", (event) =>
            this.onIceGatheringStateChangeHandler(event));
        // New candidate has added
        connection.addEventListener("icecandidate", (event) =>
            this.onIceCandidateHandler(event));
        // Ice negotiation error
        connection.addEventListener("icecandidateerror", (event) =>
            this.onIceCandidateErrorHandler(event));
        // Need to send new offer
        connection.addEventListener("negotiationneeded", (event) =>
            this.onNegotiationNeededHandler(event));
        // Signaling state changed
        connection.addEventListener("signalingstatechange", (event) =>
            this.onSignalingStateChangeHandler(event));
    }

    abstract onDataChannelHandler(event: RTCDataChannelEvent): void;
    abstract onConnectionStateChangeHandler(event: Event): void;
    abstract onIceConnectionStateChangeHandler(event: Event): void;
    abstract onIceGatheringStateChangeHandler(event: Event): void;
    abstract onNegotiationNeededHandler(event: Event): void;

    onTrackHandler(event: Event): void {
        // TODO: Log
    }
    onIceCandidateHandler(event: RTCPeerConnectionIceEvent): void {
        // TODO: Send Ice Candidate
    }
    onIceCandidateErrorHandler(event: Event): void {
        // TODO: Log
    }
    onSignalingStateChangeHandler(event: Event): void {
        // TODO: Log
    }
}