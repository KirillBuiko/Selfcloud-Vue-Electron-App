import type {Ref} from "vue";
import type {WebRTCConnectionData} from "@/types/WebRTCTypes";

export interface IWebRTCStore {
    webrtcConnectionsToRemote: Ref<Map<string, WebRTCConnectionData>>,
    webrtcConnectionsToLocal: Ref<Map<string, WebRTCConnectionData>>,
    getToRemote(fingerprint: string): WebRTCConnectionData | undefined,

    getToLocal(fingerprint: string): WebRTCConnectionData | undefined,

    getAllToRemote(): Map<string, WebRTCConnectionData>,

    getAllToLocal(): Map<string, WebRTCConnectionData>,

    createToRemote(fingerprint: string): WebRTCConnectionData,

    createToLocal(fingerprint: string): WebRTCConnectionData,

    removeToLocal(fingerprint: string): void,

    removeToRemote(fingerprint: string): void
}

export type $WebRTCStore = {webrtcStore: IWebRTCStore}