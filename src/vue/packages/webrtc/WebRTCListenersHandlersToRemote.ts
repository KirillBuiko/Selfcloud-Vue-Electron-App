import {WebRTCListenersHandlers} from "@/packages/webrtc/WebRTCListenersHandlers";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";

export class WebRTCListenersHandlersToRemote extends WebRTCListenersHandlers{
    constructor(deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions){
        super(deps);
    }

    onConnectionStateChangeHandler(event: Event): void {
        // TODO: Set connection status to remote vds
        // Open/Close Data Channel
    }

    onDataChannelHandler(event: RTCDataChannelEvent): void {
        // TODO: Add Data Channel
    }

    onIceConnectionStateChangeHandler(event: Event): void {
        // TODO: Log
    }

    onIceGatheringStateChangeHandler(event: Event): void {
        // TODO: Log
    }

    onNegotiationNeededHandler(event: Event): void {
        // TODO: Create new connection offer
    }
}

export type $WebRTCListenersHandlersToRemote = {webrtcListenersHandlersToRemote: WebRTCListenersHandlersToRemote}
