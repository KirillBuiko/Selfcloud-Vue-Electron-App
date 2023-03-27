import type {IWebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {IWebRTCStoreActions} from "@/packages/webrtc/interfaces/IWebRTCStoreActions";
import {useWebRTCStore} from "@/stores/webrtcStore";
import {SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import {useSocketStore} from "@/stores/soketStore";
import type {SCSocket} from "@/types/SocketTypes";

export class WebRTCWorkerActions implements IWebRTCWorkerActions{
    webrtcStore: IWebRTCStoreActions;
    socketEmitActions: SocketEmitActions;

    constructor() {
        this.webrtcStore = useWebRTCStore();
        this.socketEmitActions = new SocketEmitActions(useSocketStore().socket as SCSocket);
    }

    /**
     * Create new connection to remote if there is not,
     * get offer and send it, return connection
     * */
    async createConnection(fingerprint: string, socketID: string): Promise<void> {
        // TODO check
        const conn = this.webrtcStore.createRTCConnectionToRemote(fingerprint, socketID)
        const offer = await conn.createOffer();
        await conn.setLocalDescription(offer);
        if (offer.sdp)
            this.socketEmitActions.connectToDevice(socketID, fingerprint, offer.sdp);
    }

    /**
     * Delete connection
     * */
    removeConnectionToRemote(fingerprint: string): void {
        // TODO check
        this.webrtcStore.removeRTCConnectionToRemote(fingerprint);
    }

    removeConnectionToLocal(fingerprint: string): void {
        // TODO check
        this.webrtcStore.removeRTCConnectionToLocal(fingerprint);
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
        const conn = this.webrtcStore.createRTCConnectionToLocal(fingerprint, socketID)
        await conn.setLocalDescription({
            sdp: offer,
            type: "offer"
        });
        const answer = await conn.createOffer();
        await conn.setRemoteDescription(answer);
        if (answer.sdp)
            this.socketEmitActions.acceptConnectionToDevice(socketID, fingerprint, answer.sdp);
    }

    /**
     * Add ICE Candidate to connection
     * */
    async setCandidate(socketID: string, fingerprint: string, candidate: string): Promise<void>{
        let conn = this.webrtcStore.getRTCConnectionToLocal(fingerprint);
        if (conn)
            await conn.addIceCandidate({candidate: candidate});
        else{
            conn = this.webrtcStore.getRTCConnectionToRemote(fingerprint);
            if (conn)
                await conn.addIceCandidate({candidate: candidate});
        }
    }

    /**
     * Send ICE Candidate
     * */
    sendCandidate(socketID: string, fingerprint: string, candidate: string): void{
        // TODO
        this.socketEmitActions.sendWebRTCCandidate(socketID, fingerprint, candidate);
    }
}