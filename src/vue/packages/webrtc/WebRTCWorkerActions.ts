import type {IWebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$WebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export class WebRTCWorkerActions implements IWebRTCWorkerActions{
    constructor(private deps: $WebRTCStore & $SocketEmitActions) {}

    /**
     * Create new connection to remote if there is not,
     * get offer and send it, return connection
     * */
    async createConnection(fingerprint: string, socketID: string): Promise<void> {
        // TODO check
        const conn = this.deps.webrtcStore.createRTCConnectionToRemote(fingerprint, socketID)
        const offer = await conn.connection.createOffer();
        await conn.connection.setLocalDescription(offer);
        if (offer.sdp)
            this.deps.socketEmitActions.connectToDevice(socketID, fingerprint, offer.sdp);
    }

    /**
     * Delete connection
     * */
    removeConnectionToRemote(fingerprint: string): void {
        // TODO check
        this.deps.webrtcStore.removeRTCConnectionToRemote(fingerprint);
    }

    removeConnectionToLocal(fingerprint: string): void {
        // TODO check
        this.deps.webrtcStore.removeRTCConnectionToLocal(fingerprint);
    }

    /**
     * Set remote answer to connection
     * */
    setRemoteAnswer(socketID: string, fingerprint: string, answer: string): void {
        // TODO
    }

    /**
     * Create new connection to local, set remote offer and send answer
     * */
    async answerToOffer(fingerprint: string, socketID: string, offer: string): Promise<void> {
        // TODO check
        const conn = this.deps.webrtcStore.createRTCConnectionToLocal(fingerprint, socketID)
        await conn.connection.setLocalDescription({
            sdp: offer,
            type: "offer"
        });
        const answer = await conn.connection.createOffer();
        await conn.connection.setRemoteDescription(answer);
        if (answer.sdp)
            this.deps.socketEmitActions.acceptConnectionToDevice(socketID, fingerprint, answer.sdp);
    }

    /**
     * Add ICE Candidate to connection
     * */
    async setCandidate(socketID: string, fingerprint: string, candidate: string): Promise<void>{
        let conn = this.deps.webrtcStore.getRTCConnectionToLocal(fingerprint);
        if (conn)
            await conn.connection.addIceCandidate({candidate: candidate});
        else{
            conn = this.deps.webrtcStore.getRTCConnectionToRemote(fingerprint);
            if (conn)
                await conn.connection.addIceCandidate({candidate: candidate});
        }
    }

    /**
     * Send ICE Candidate
     * */
    sendCandidate(socketID: string, fingerprint: string, candidate: string): void{
        // TODO
        this.deps.socketEmitActions.sendWebRTCCandidate(socketID, fingerprint, candidate);
    }
}