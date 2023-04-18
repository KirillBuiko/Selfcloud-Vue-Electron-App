import {ref} from "vue";
import type {IWebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";

export class WebRTCStore implements IWebRTCStore{
    webrtcConnectionsToRemote = ref(new Map<string, RTCPeerConnection>());
    webrtcConnectionsToLocal = ref(new Map<string, RTCPeerConnection>());

    createRTCConnectionToLocal(fingerprint: string, socketID: string): RTCPeerConnection {
        let conn = this.getRTCConnectionToLocal(fingerprint)
        if (conn && conn.connectionState === "connected")
            return conn;
        else if (conn)
            this.removeRTCConnectionToLocal(fingerprint);
        conn = this.createRTCConnectionToLocal(fingerprint, socketID);
        return conn;
    }

    createRTCConnectionToRemote(fingerprint: string, socketID: string): RTCPeerConnection {
        let conn = this.getRTCConnectionToRemote(fingerprint)
        if (conn && conn.connectionState === "connected")
            return conn;
        else if (conn)
            this.removeRTCConnectionToRemote(fingerprint);
        conn = this.createRTCConnectionToRemote(fingerprint, socketID);
        return conn;
    }

    getAllRTCConnectionsToLocal(): Map<string, RTCPeerConnection> {
        return this.webrtcConnectionsToLocal.value;
    }

    getAllRTCConnectionsToRemote(): Map<string, RTCPeerConnection> {
        return this.webrtcConnectionsToRemote.value;
    }

    getRTCConnectionToLocal(fingerprint: string): RTCPeerConnection | undefined {
        return this.webrtcConnectionsToLocal.value.get(fingerprint);
    }

    getRTCConnectionToRemote(fingerprint: string): RTCPeerConnection | undefined {
        return this.webrtcConnectionsToRemote.value.get(fingerprint);
    }

    removeRTCConnectionToLocal(fingerprint: string): void {
        const conn = this.webrtcConnectionsToLocal.value.get(fingerprint);
        if(conn) {
            conn.close();
            this.webrtcConnectionsToLocal.value.delete(fingerprint);
        }
    }

    removeRTCConnectionToRemote(fingerprint: string): void {
        const conn = this.webrtcConnectionsToRemote.value.get(fingerprint);
        if(conn) {
            conn.close();
            this.webrtcConnectionsToRemote.value.delete(fingerprint);
        }
    }
}
