import type {Ref} from "vue";
import type {WebRTCConnectionData} from "@/types/WebRTCTypes";

export interface IWebRTCStore {
    webrtcConnectionsToRemote: Ref<Map<string, WebRTCConnectionData>>,
    webrtcConnectionsToLocal: Ref<Map<string, WebRTCConnectionData>>,
    getRTCConnectionToRemote(fingerprint: string): WebRTCConnectionData | undefined,

    getRTCConnectionToLocal(fingerprint: string): WebRTCConnectionData | undefined,

    getAllRTCConnectionsToRemote(): Map<string, WebRTCConnectionData>,

    getAllRTCConnectionsToLocal(): Map<string, WebRTCConnectionData>,

    createRTCConnectionToRemote(fingerprint: string, socketID: string): WebRTCConnectionData,

    createRTCConnectionToLocal(fingerprint: string, socketID: string): WebRTCConnectionData,

    removeRTCConnectionToLocal(fingerprint: string): void,

    removeRTCConnectionToRemote(fingerprint: string): void
}

export type $WebRTCStore = {webrtcStore: IWebRTCStore}