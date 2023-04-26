import {type Ref, ref} from "vue";
import type {IWebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {WebRTCConnectionData, WebRTCStoreObject} from "@/types/WebRTCTypes";
import type {$WebRTCListenersHandlersToRemote} from "@/packages/webrtc/WebRTCListenersHandlersToRemote";
import type {$WebRTCListenersHandlersToLocal} from "@/packages/webrtc/WebRTCListenersHandlersToLocal";

export class WebRTCStore implements IWebRTCStore {
    webrtcConnections: Ref<WebRTCStoreObject> = ref([]);

    constructor(private deps: $WebRTCListenersHandlersToRemote & $WebRTCListenersHandlersToLocal) {
    }

    private createRTCConnection(fingerprint: string, isToLocal: boolean): WebRTCConnectionData {
        const conn: WebRTCConnectionData = {
            fingerprint: fingerprint,
            connectionHandle: this.createPeerConnection(),
            isToLocal: isToLocal
        }
        this.webrtcConnections.value.push(conn);
        return conn;
    }

    createConnection(fingerprint: string, isToLocal: boolean): WebRTCConnectionData {
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
        return new RTCPeerConnection();
    }

    getAll(isToLocal: boolean): WebRTCConnectionData[] {
        const resList: WebRTCConnectionData[] = [];
        this.webrtcConnections.value.forEach((val) => {
            if (val.isToLocal == isToLocal) resList.push(val)
        });
        return resList;
    }

    get(fingerprint: string, isToLocal: boolean): WebRTCConnectionData | undefined {
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
}
