import type {IWebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";

export class WebRTCWorkerActions implements IWebRTCWorkerActions{
    createConnection(socketID: string, fingerprint: string): void {
        // create connection if there is not, or update connection if disconnected
        // get offer and send it
        // return connection
    }

    removeConnection(fingerprint: string): void {
        // delete connection
    }

    setRemoteAnswer(socketID: string, fingerprint: string, answer: string): void {
        // set remote answer to connection
    }

    answerToOffer(socketID: string, fingerprint: string, offer: string): void {
        // create new connection
        // set remote offer to connection
        // get answer and send it
    }

    setCandidate(socketID: string, fingerprint: string, candidate: string): void{
        // set candidate to some connection
    }

    sendCandidate(socketID: string, fingerprint: string, candidate: string): void{
        // send candidate from some connection
    }
}