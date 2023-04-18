import type {IWebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$WebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStoreActions";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export class WebRTCWorkerActions implements IWebRTCWorkerActions{
    constructor(private servs: $WebRTCStore & $SocketEmitActions) {}

    /**
     * Create new connection to remote if there is not,
     * get offer and send it, return connection
     * */
    async createConnection(fingerprint: string, socketID: string): Promise<void> {
        // TODO check
        const conn = this.servs.webrtcStore.createRTCConnectionToRemote(fingerprint, socketID)
        const offer = await conn.createOffer();
        await conn.setLocalDescription(offer);
        if (offer.sdp)
            this.servs.socketEmitActions.connectToDevice(socketID, fingerprint, offer.sdp);
    }

    /**
     * Delete connection
     * */
    removeConnectionToRemote(fingerprint: string): void {
        // TODO check
        this.servs.webrtcStore.removeRTCConnectionToRemote(fingerprint);
    }

    removeConnectionToLocal(fingerprint: string): void {
        // TODO check
        this.servs.webrtcStore.removeRTCConnectionToLocal(fingerprint);
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
        const conn = this.servs.webrtcStore.createRTCConnectionToLocal(fingerprint, socketID)
        await conn.setLocalDescription({
            sdp: offer,
            type: "offer"
        });
        const answer = await conn.createOffer();
        await conn.setRemoteDescription(answer);
        if (answer.sdp)
            this.servs.socketEmitActions.acceptConnectionToDevice(socketID, fingerprint, answer.sdp);
    }

    /**
     * Add ICE Candidate to connection
     * */
    async setCandidate(socketID: string, fingerprint: string, candidate: string): Promise<void>{
        let conn = this.servs.webrtcStore.getRTCConnectionToLocal(fingerprint);
        if (conn)
            await conn.addIceCandidate({candidate: candidate});
        else{
            conn = this.servs.webrtcStore.getRTCConnectionToRemote(fingerprint);
            if (conn)
                await conn.addIceCandidate({candidate: candidate});
        }
    }

    /**
     * Send ICE Candidate
     * */
    sendCandidate(socketID: string, fingerprint: string, candidate: string): void{
        // TODO
        this.servs.socketEmitActions.sendWebRTCCandidate(socketID, fingerprint, candidate);
    }
}