import type {Ref} from "vue";
import type {WebRTCStoreObject} from "@/types/WebRTCTypes";
import type {WebRTCConnectionClass} from "@/packages/webrtc/WebRTCConnectionClass";

export interface IWebRTCStore {
    webrtcConnections: Ref<WebRTCStoreObject>;

    createConnection(fingerprint: string, isToRemote: boolean): WebRTCConnectionClass;

    createPeerConnection(): RTCPeerConnection;

    getAll(isToLocal: boolean): WebRTCConnectionClass[];

    get(fingerprint: string, isToLocal: boolean): WebRTCConnectionClass | undefined;

    getIndex(fingerprint: string, isToLocal: boolean): number;

    remove(fingerprint: string, isToLocal: boolean): void;
}

export type $WebRTCStore = { webrtcStore: IWebRTCStore }