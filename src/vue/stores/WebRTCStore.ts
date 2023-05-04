import {computed, type ComputedRef, type Ref, ref} from "vue";
import type {IWebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {WebRTCStoreObject} from "@/types/WebRTCTypes";
import type {$WebRTCListenersHandlersToRemote} from "@/packages/webrtc/WebRTCListenersHandlersToRemote";
import type {$WebRTCListenersHandlersToLocal} from "@/packages/webrtc/WebRTCListenersHandlersToLocal";
import {WebRTCConnectionClass} from "@/packages/webrtc/WebRTCConnectionClass";

export class WebRTCStore implements IWebRTCStore {
    webrtcConnections: Ref<WebRTCStoreObject> = ref([]);

    constructor(private deps: $WebRTCListenersHandlersToRemote & $WebRTCListenersHandlersToLocal) {
    }

    createConnection(fingerprint: string, isToLocal: boolean): WebRTCConnectionClass {
        const conn = this.get(fingerprint, isToLocal);
        if (conn)
            this.remove(fingerprint, isToLocal);
        const newConnection = this.createRTCConnection(fingerprint, isToLocal);
        if (isToLocal)
            this.deps.webrtcListenersHandlersToLocal.attachListeners(newConnection);
        else
            this.deps.webrtcListenersHandlersToRemote.attachListeners(newConnection)
        return newConnection;
    }

    createPeerConnection(): RTCPeerConnection {
        return new RTCPeerConnection({
            iceServers: [
                {
                    urls: ["stun:stun4.l.google.com:19302"]
                }
            ]
        });
    }

    getAll(isToLocal: boolean): ComputedRef<WebRTCConnectionClass[]> {
        return computed(() => {
            const resList: WebRTCConnectionClass[] = [];
            this.webrtcConnections.value.forEach((val) => {
                if (val.isToLocal == isToLocal) resList.push(val)
            });
            return resList;
        })
    }

    get(fingerprint: string, isToLocal: boolean): WebRTCConnectionClass | undefined {
        return this.webrtcConnections.value[this.getIndex(fingerprint, isToLocal)];
    }

    getIndex(fingerprint: string, isToLocal: boolean): number {
        return this.webrtcConnections.value.findIndex((val) =>
            val.fingerprint == fingerprint && val.isToLocal == isToLocal);
    }

    remove(fingerprint: string, isToLocal: boolean): void {
        const ind = this.getIndex(fingerprint, isToLocal);
        if (ind >= 0) {
            this.webrtcConnections.value[ind].connectionHandle.close();
            this.webrtcConnections.value.splice(ind, 1);
        }
    }

    private createRTCConnection(fingerprint: string, isToLocal: boolean): WebRTCConnectionClass {
        const conn = new WebRTCConnectionClass(fingerprint, isToLocal, this.createPeerConnection());
        this.webrtcConnections.value.push(conn);
        return conn;
    }
}
