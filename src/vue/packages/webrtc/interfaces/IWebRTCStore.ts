import type {Ref} from "vue";
import type {WebRTCConnectionData} from "@/types/WebRTCTypes";
import type {WebRTCStoreObject} from "@/types/WebRTCTypes";

export interface IWebRTCStore {
    webrtcConnections: Ref<WebRTCStoreObject>;

    createConnection(fingerprint: string, isToRemote: boolean): WebRTCConnectionData;

    createPeerConnection(): RTCPeerConnection;

    getAll(isToLocal: boolean): WebRTCConnectionData[];

    get(fingerprint: string, isToLocal: boolean): WebRTCConnectionData | undefined;

    getIndex(fingerprint: string, isToLocal: boolean): number;

    remove(fingerprint: string, isToLocal: boolean): void;
}

export type $WebRTCStore = {webrtcStore: IWebRTCStore}