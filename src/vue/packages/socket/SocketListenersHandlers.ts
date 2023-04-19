import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";


export class SocketListenersHandlers{
    constructor(private deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions) {}

    /**
     * Get virtual disks from socket, set online to them,
     * provide all ready local virtual disks
     * */
    onConnected(){
        // TODO check
        this.deps.socketEmitActions.getVirtualDisks().then((vds: VirtualDiskData[]) =>
            this.deps.virtualDiskWorkerActions.syncVirtualDisks(vds)
        ).catch(() => {
            // TODO: Exception handle
        });
        const readyList: string[] = [];
        this.deps.virtualDiskWorkerActions.getAllLocalVirtualDisks().forEach((vd) => {
            if(vd.isCheckSuccess)
                readyList.push(vd.getConfig().vdID);
        });
        this.deps.socketEmitActions.provideVirtualDisks(readyList);
    }

    onDisconnected(){
        // TODO check
    }

    /**
     * Set offline to all this device's vd
     * */
    onDeviceDisconnected(fingerprint: string){
        // TODO check
        this.deps.virtualDiskWorkerActions.setRemoteDeviceOffline(fingerprint);
    }

    /**
     * Nothing*/
    onDeviceConnected(socketID: string, fingerprint: string){
        // TODO check
    }

    /**
     * Set online to all provided virtual disks
     * */
    onProvideVirtualDisks(socketID: string, fingerprint: string, vdIDs: string[]){
        // TODO check
        this.deps.virtualDiskWorkerActions.setRemoteVirtualDisksProvided(socketID, fingerprint, vdIDs);
    }

    /**
     * Set remote virtual disk offline
     * */
    onRevokeVirtualDisk(fingerprint: string, vdID: string){
        // TODO check
        this.deps.virtualDiskWorkerActions.setRemoteVirtualDiskOffline(fingerprint, vdID);
    }

    /**
     * Add remote virtual disk
     * */
    onCreateVirtualDisk(vd: VirtualDiskData){
        // TODO check
        this.deps.virtualDiskWorkerActions.addRemoteVirtualDisk(vd);
    }

    /**
     * Remove remote or local virtual disk
     * */
    onRemoveVirtualDisk(vdID: string){
        // TODO check
        // remove vd by worker
        if(this.deps.virtualDiskWorkerActions.getLocalVirtualDisk(vdID))
            this.deps.virtualDiskWorkerActions.removeLocalVirtualDisk(vdID);
        else
            this.deps.virtualDiskWorkerActions.removeRemoteVirtualDisk(vdID);
    }

    onWebRTCOfferReceived(sourceID: string, fingerprint: string, offer: string){
        // TODO check
        this.deps.webrtcWorkerActions.answerToOffer(fingerprint, sourceID, offer);
    }

    onWebRTCAnswerReceived(sourceID: string, fingerprint: string, answer: string){
        // TODO check
        this.deps.webrtcWorkerActions.setRemoteAnswer(sourceID, fingerprint, answer);
    }

    onWebRTCCandidateReceived(sourceID: string, fingerprint: string, candidate: string){
        // TODO check
        this.deps.webrtcWorkerActions.setCandidate(sourceID, fingerprint, candidate);
    }
}

export type $SocketListenersHandlers = {socketListenersHandlers: SocketListenersHandlers}
