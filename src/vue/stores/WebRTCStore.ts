import {type Ref, ref} from "vue";
import type {IWebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {WebRTCConnectionData} from "@/types/WebRTCTypes";
import type {$WebRTCListenersHandlersToRemote} from "@/packages/webrtc/WebRTCListenersHandlersToRemote";
import type {$WebRTCListenersHandlersToLocal} from "@/packages/webrtc/WebRTCListenersHandlersToLocal";

export class WebRTCStore implements IWebRTCStore{
    webrtcConnectionsToRemote = ref(new Map<string, WebRTCConnectionData>());
    webrtcConnectionsToLocal = ref(new Map<string, WebRTCConnectionData>());

    constructor(private deps: $WebRTCListenersHandlersToRemote & $WebRTCListenersHandlersToLocal) {}

    private createRTCConnection(fingerprint: string,
                                webrtcMap: Ref<Map<string, WebRTCConnectionData>>): WebRTCConnectionData {
        const conn: WebRTCConnectionData = {
            connectionHandle: this.createPeerConnection()
        }
        webrtcMap.value.set(fingerprint, conn);
        return conn;
    }

    createToLocal(fingerprint: string): WebRTCConnectionData {
        const conn = this.getToLocal(fingerprint);
        if (conn)
            this.removeToLocal(fingerprint);
        const newConnection = this.createRTCConnection(fingerprint, this.webrtcConnectionsToLocal);
        this.deps.webrtcListenersHandlersToLocal.attachListeners(newConnection.connectionHandle, fingerprint);
        return newConnection;
    }

    createToRemote(fingerprint: string): WebRTCConnectionData {
        const conn = this.getToRemote(fingerprint);
        if (conn && conn.connectionHandle.connectionState === "connected")
            return conn;
        else if (conn)
            this.removeToRemote(fingerprint);
        const newConnection = this.createRTCConnection(fingerprint, this.webrtcConnectionsToRemote);
        this.deps.webrtcListenersHandlersToRemote.attachListeners(newConnection.connectionHandle, fingerprint);
        return newConnection;
    }

    createPeerConnection(): RTCPeerConnection{
        return new RTCPeerConnection();
    }

    private getAll(webrtcMap: Ref<Map<string, WebRTCConnectionData>>): Map<string, WebRTCConnectionData> {
        return webrtcMap.value;
    }

    getAllToLocal() {
        return this.getAll(this.webrtcConnectionsToLocal);
    }

    getAllToRemote() {
        return this.getAll(this.webrtcConnectionsToRemote);
    }

    private get(fingerprint: string, webrtcMap: Ref<Map<string, WebRTCConnectionData>>) {
        return webrtcMap.value.get(fingerprint);
    }

    getToLocal(fingerprint: string) {
        return this.get(fingerprint, this.webrtcConnectionsToLocal);
    }

    getToRemote(fingerprint: string) {
        return this.get(fingerprint, this.webrtcConnectionsToRemote);
    }

    private remove(fingerprint: string, webrtcMap: Ref<Map<string, WebRTCConnectionData>>) {
        const conn = webrtcMap.value.get(fingerprint);
        if(conn) {
            conn.connectionHandle.close();
            webrtcMap.value.delete(fingerprint);
        }
    }

    removeToLocal(fingerprint: string) {
        this.remove(fingerprint, this.webrtcConnectionsToLocal);
    }

    removeToRemote(fingerprint: string) {
        this.remove(fingerprint, this.webrtcConnectionsToRemote);
    }
}
