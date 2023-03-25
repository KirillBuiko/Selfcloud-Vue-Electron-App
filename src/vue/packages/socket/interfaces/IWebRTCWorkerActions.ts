export interface IWebRTCWorkerActions {
    createConnection(socketID: string, fingerprint: string): void,

    answerToOffer(socketID: string, fingerprint: string, offer: string): void,

    removeConnection(fingerprint: string): void,

    setRemoteAnswer(socketID: string, fingerprint: string, answer: string): void,

    setCandidate(socketID: string, fingerprint: string, candidate: string): void,

    sendCandidate(socketID: string, fingerprint: string, candidate: string): void,
}