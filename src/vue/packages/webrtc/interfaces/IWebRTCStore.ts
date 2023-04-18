import type {Ref} from "vue";

export interface IWebRTCStore {
    webrtcConnectionsToRemote: Ref<Map<string, RTCPeerConnection>>,
    webrtcConnectionsToLocal: Ref<Map<string, RTCPeerConnection>>,
    getRTCConnectionToRemote(fingerprint: string): RTCPeerConnection | undefined,

    getRTCConnectionToLocal(fingerprint: string): RTCPeerConnection | undefined,

    getAllRTCConnectionsToRemote(): Map<string, RTCPeerConnection>,

    getAllRTCConnectionsToLocal(): Map<string, RTCPeerConnection>,

    createRTCConnectionToRemote(fingerprint: string, socketID: string): RTCPeerConnection,

    createRTCConnectionToLocal(fingerprint: string, socketID: string): RTCPeerConnection,

    removeRTCConnectionToLocal(fingerprint: string): void,

    removeRTCConnectionToRemote(fingerprint: string): void
}

export type $WebRTCStore = {webrtcStore: IWebRTCStore}