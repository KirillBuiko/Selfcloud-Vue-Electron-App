import {defineStore} from "pinia";
import type {IWebRTCStoreActions, IWebRTCStoreState} from "@/packages/webrtc/interfaces/IWebRTCStoreActions";

export const useWebRTCStore = defineStore<"webrtcStore", IWebRTCStoreState, {}, IWebRTCStoreActions>('webrtcStore',
    {
    state: () => ({
        webrtcConnectionsToRemote: new Map<string, RTCPeerConnection>(),
        webrtcConnectionsToLocal: new Map<string, RTCPeerConnection>()
    }),
    actions:{
        createRTCConnectionToLocal(fingerprint: string, socketID: string): RTCPeerConnection {
            let conn = this.getRTCConnectionToLocal(fingerprint)
            if (conn && conn.connectionState === "connected")
                return conn;
            else if (conn)
                this.removeRTCConnectionToLocal(fingerprint);
            conn = this.createRTCConnectionToLocal(fingerprint, socketID);
            return conn;
        },
        createRTCConnectionToRemote(fingerprint: string, socketID: string): RTCPeerConnection {
            let conn = this.getRTCConnectionToRemote(fingerprint)
            if (conn && conn.connectionState === "connected")
                return conn;
            else if (conn)
                this.removeRTCConnectionToRemote(fingerprint);
            conn = this.createRTCConnectionToRemote(fingerprint, socketID);
            return conn;
        },
        getAllRTCConnectionsToLocal(): Map<string, RTCPeerConnection> {
            return this.webrtcConnectionsToLocal;
        },
        getAllRTCConnectionsToRemote(): Map<string, RTCPeerConnection> {
            return this.webrtcConnectionsToRemote;
        },
        getRTCConnectionToLocal(fingerprint: string): RTCPeerConnection | undefined {
            return this.webrtcConnectionsToLocal.get(fingerprint);
        },
        getRTCConnectionToRemote(fingerprint: string): RTCPeerConnection | undefined {
            return this.webrtcConnectionsToRemote.get(fingerprint);
        },
        removeRTCConnectionToLocal(fingerprint: string): void {
            const conn = this.webrtcConnectionsToLocal.get(fingerprint);
            if(conn) {
                conn.close();
                this.webrtcConnectionsToLocal.delete(fingerprint);
            }
        },
        removeRTCConnectionToRemote(fingerprint: string): void {
            const conn = this.webrtcConnectionsToRemote.get(fingerprint);
            if(conn) {
                conn.close();
                this.webrtcConnectionsToRemote.delete(fingerprint);
            }
        }
    }
})
