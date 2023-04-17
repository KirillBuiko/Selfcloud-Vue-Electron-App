import type {$VirtualDiskStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStoreActions";

export interface IWebRTCWorkerActions {
    createConnection(fingerprint: string, socketID: string): Promise<void>,

    answerToOffer(fingerprint: string, socketID: string, offer: string): Promise<void>,

    removeConnectionToRemote(fingerprint: string): void,

    removeConnectionToLocal(fingerprint: string): void,

    setRemoteAnswer(socketID: string, fingerprint: string, answer: string): void,

    setCandidate(socketID: string, fingerprint: string, candidate: string): Promise<void>,

    sendCandidate(socketID: string, fingerprint: string, candidate: string): void,
}

export type $WebRTCWorkerActions = {webrtcWorkerActions: IWebRTCWorkerActions}