export type WebRTCStoreObject = WebRTCConnectionData[];

export interface WebRTCConnectionData {
    isToLocal: boolean,
    fingerprint: string,
    connectionHandle: RTCPeerConnection
}