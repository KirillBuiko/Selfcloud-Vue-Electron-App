import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {WebRTCConnectionData} from "@/types/WebRTCTypes";

export abstract class WebRTCListenersHandlers{
    protected constructor(private deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions){}

    attachListeners(connection: WebRTCConnectionData){
        // Added DataChannel to connection
        connection.connectionHandle.addEventListener("datachannel", (event) =>
            this.onDataChannelHandler(event));
        // Connection state changed
        connection.connectionHandle.addEventListener("connectionstatechange", (event) =>
            this.onConnectionStateChangeHandler(event));
        // ?
        connection.connectionHandle.addEventListener("track", (event) =>
            this.onTrackHandler(event));
        // ?
        connection.connectionHandle.addEventListener("iceconnectionstatechange", (event) =>
            this.onIceConnectionStateChangeHandler(event));
        // ?
        connection.connectionHandle.addEventListener("icegatheringstatechange", (event) =>
            this.onIceGatheringStateChangeHandler(event));
        // New candidate has added
        connection.connectionHandle.addEventListener("icecandidate", (event) =>
            this.onIceCandidateHandler(event));
        // Ice negotiation error
        connection.connectionHandle.addEventListener("icecandidateerror", (event) =>
            this.onIceCandidateErrorHandler(event));
        // Need to send new offer
        connection.connectionHandle.addEventListener("negotiationneeded", (event) =>
            this.onNegotiationNeededHandler(event));
        // Signaling state changed
        connection.connectionHandle.addEventListener("signalingstatechange", (event) =>
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