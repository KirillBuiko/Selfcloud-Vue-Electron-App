import {WebRTCListenersHandlers} from "@/packages/webrtc/WebRTCListenersHandlers";
import type { $WebRTCWorkerActions } from "../socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";

export class WebRTCListenersHandlersToLocal extends WebRTCListenersHandlers {
    constructor(deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions){
        super(deps);
    }

    onConnectionStateChangeHandler(event: Event): void {
        // TODO: Nothing
    }

    onDataChannelHandler(event: RTCDataChannelEvent): void {
        // TODO: Add DataChannel
    }

    onIceConnectionStateChangeHandler(event: Event): void {
        // TODO: Log
    }

    onIceGatheringStateChangeHandler(event: Event): void {
        // TODO: Log
    }

    onNegotiationNeededHandler(event: Event): void {
        // TODO: Nothing
    }
}

export type $WebRTCListenersHandlersToLocal = {webrtcListenersHandlersToLocal: WebRTCListenersHandlersToLocal}
