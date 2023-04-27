import {reactive, ref} from "vue";

export class WebRTCConnectionClass{
    states = reactive({
        connectionState: "new" as RTCPeerConnectionState,
        iceConnectionState: "new" as RTCIceConnectionState,
        iceGatheringState: "new" as RTCIceGatheringState,
        signalingState: "closed" as RTCSignalingState
    });

    constructor(public fingerprint: string, public isToLocal: boolean, public connectionHandle: RTCPeerConnection) {}
}