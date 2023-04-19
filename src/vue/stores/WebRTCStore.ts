import {type Ref, ref} from "vue";
import type {IWebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {WebRTCConnectionData} from "@/types/WebRTCTypes";

export class WebRTCStore implements IWebRTCStore{
    webrtcConnectionsToRemote = ref(new Map<string, WebRTCConnectionData>());
    webrtcConnectionsToLocal = ref(new Map<string, WebRTCConnectionData>());

    private createRTCConnection(fingerprint: string, socketID: string,
                        webrtcMap: Ref<Map<string, WebRTCConnectionData>>): WebRTCConnectionData {
        const conn = {
            socketID,
            connection: this.createPeerConnection()
        }
        webrtcMap.value.set(fingerprint, conn);
        return conn;
    }

    createRTCConnectionToLocal(fingerprint: string, socketID: string): WebRTCConnectionData {
        const conn = this.getRTCConnectionToLocal(fingerprint);
        if (conn)
            this.removeRTCConnectionToLocal(fingerprint);
        return this.createRTCConnection(fingerprint, socketID, this.webrtcConnectionsToLocal);
    }

    createRTCConnectionToRemote(fingerprint: string, socketID: string): WebRTCConnectionData {
        const conn = this.getRTCConnectionToRemote(fingerprint);
        if (conn && conn.connection.connectionState === "connected")
            return conn;
        else if (conn)
            this.removeRTCConnectionToRemote(fingerprint);
        return this.createRTCConnection(fingerprint, socketID, this.webrtcConnectionsToRemote);
    }

    createPeerConnection(): RTCPeerConnection{
        return new RTCPeerConnection();
    }

    getAllRTCConnections(webrtcMap: Ref<Map<string, WebRTCConnectionData>>): Map<string, WebRTCConnectionData> {
        return webrtcMap.value;
    }

    getAllRTCConnectionsToLocal() {
        return this.getAllRTCConnections(this.webrtcConnectionsToLocal);
    }

    getAllRTCConnectionsToRemote() {
        return this.getAllRTCConnections(this.webrtcConnectionsToRemote);
    }

    getRTCConnection(fingerprint: string, webrtcMap: Ref<Map<string, WebRTCConnectionData>>) {
        return webrtcMap.value.get(fingerprint);
    }

    getRTCConnectionToLocal(fingerprint: string) {
        return this.getRTCConnection(fingerprint, this.webrtcConnectionsToLocal);
    }

    getRTCConnectionToRemote(fingerprint: string) {
        return this.getRTCConnection(fingerprint, this.webrtcConnectionsToRemote);
    }

    removeRTCConnection(fingerprint: string, webrtcMap: Ref<Map<string, WebRTCConnectionData>>) {
        const conn = webrtcMap.value.get(fingerprint);
        if(conn) {
            conn.connection.close();
            webrtcMap.value.delete(fingerprint);
        }
    }

    removeRTCConnectionToLocal(fingerprint: string) {
        this.removeRTCConnection(fingerprint, this.webrtcConnectionsToLocal);
    }

    removeRTCConnectionToRemote(fingerprint: string) {
        this.removeRTCConnection(fingerprint, this.webrtcConnectionsToRemote);
    }
}
