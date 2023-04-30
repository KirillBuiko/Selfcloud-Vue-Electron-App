import type {IWebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$WebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export class WebRTCWorkerActions implements IWebRTCWorkerActions {
    constructor(private deps: $WebRTCStore & $SocketEmitActions) {
    }

    /**
     * Create new connection to remote if there is not,
     * get offer and send it, return connection
     * */
    async createConnection(fingerprint: string): Promise<void> {
        // TODO check
        const conn = this.deps.webrtcStore.createConnection(fingerprint, false);
        conn.connectionHandle.createDataChannel("FileDataChannel");
        await this.createConnectionOffer(fingerprint, conn.connectionHandle);
    }

    async createConnectionOffer(fingerprint: string, connection: RTCPeerConnection) {
        const offer = await connection.createOffer();
        await connection.setLocalDescription(offer);
        if (offer.sdp)
            this.deps.socketEmitActions.connectToDevice(fingerprint, offer.sdp);
    }

    /**
     * Delete connection
     * */
    removeConnectionToRemote(fingerprint: string): void {
        // TODO check
        this.deps.webrtcStore.remove(fingerprint, false);
    }

    removeConnectionToLocal(fingerprint: string): void {
        // TODO check
        this.deps.webrtcStore.remove(fingerprint, true);
    }

    /**
     * Set remote answer to connection
     * */
    async setRemoteAnswer(fingerprint: string, answer: string): Promise<void> {
        this.deps.webrtcStore.get(fingerprint, false)?.connectionHandle.setRemoteDescription({
            type: "answer",
            sdp: answer
        })
    }

    /**
     * Create new connection to local, set remote offer and send answer
     * */
    async answerToOffer(fingerprint: string, offer: string): Promise<void> {
        // TODO check
        const conn = this.deps.webrtcStore.createConnection(fingerprint, true);
        await conn.connectionHandle.setRemoteDescription({
            sdp: offer,
            type: "offer"
        });
        const answer = await conn.connectionHandle.createAnswer();
        await conn.connectionHandle.setLocalDescription(answer);
        if (answer.sdp)
            this.deps.socketEmitActions.acceptConnectionToDevice(fingerprint, answer.sdp);
    }

    /**
     * Add ICE Candidate to connection
     * */
    async setCandidate(fingerprint: string, candidate: RTCIceCandidate, isToLocal: boolean): Promise<void> {
        const conn = this.deps.webrtcStore.get(fingerprint, isToLocal);
        if (!conn || !conn.connectionHandle) return;
        await conn.connectionHandle.addIceCandidate(candidate);
    }
}