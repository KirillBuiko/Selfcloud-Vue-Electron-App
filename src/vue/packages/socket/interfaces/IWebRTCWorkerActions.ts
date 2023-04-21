export interface IWebRTCWorkerActions {
    createConnection(fingerprint: string): Promise<void>,

    createConnection(fingerprint: string): Promise<void>,

    answerToOffer(fingerprint: string, offer: string): Promise<void>,

    removeConnectionToRemote(fingerprint: string): void,

    removeConnectionToLocal(fingerprint: string): void,

    setRemoteAnswer(fingerprint: string, answer: string): Promise<void>,

    setCandidate(fingerprint: string, candidate: string, isToLocal: boolean): Promise<void>
}

export type $WebRTCWorkerActions = {webrtcWorkerActions: IWebRTCWorkerActions}