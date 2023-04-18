import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";


export class SocketListenersHandlers{
    constructor(private servs: $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions) {}

    /**
     * Get virtual disks from socket, set online to them,
     * provide all ready local virtual disks
     * */
    onConnected(){
        // TODO check
        this.servs.socketEmitActions.getVirtualDisks().then((vds: VirtualDiskData[]) => {
            vds.forEach((vd: VirtualDiskData) => {
                if(this.servs.virtualDiskWorkerActions.getLocalVirtualDisk(vd.vdID)) return;
                this.servs.virtualDiskWorkerActions.addRemoteVirtualDisk(vd);
                if(vd.isOnline)
                    this.servs.virtualDiskWorkerActions.setRemoteVirtualDisksOnline(vd.socketID, vd.fingerprint, [vd.vdID]);
            })
        }).catch(() => {
            //
        });
        const readyList: string[] = [];
        this.servs.virtualDiskWorkerActions.getAllLocalVirtualDisks().forEach((vd) => {
            const config = vd.getConfig();
            if(config.readyForConnection)
                readyList.push(config.vdID);
        });
        this.servs.socketEmitActions.provideVirtualDisks(readyList);
    }


    onDisconnected(){
        // TODO check
    }

    /**
     * Set offline to all this device's vd
     * */
    onDeviceDisconnected(fingerprint: string){
        // TODO check
        this.servs.virtualDiskWorkerActions.setRemoteDeviceOffline(fingerprint);
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
        this.servs.virtualDiskWorkerActions.setRemoteVirtualDisksOnline(socketID, fingerprint, vdIDs);
    }

    /**
     * Set remote virtual disk offline
     * */
    onRevokeVirtualDisk(fingerprint: string, vdID: string){
        // TODO check
        this.servs.virtualDiskWorkerActions.setRemoteVirtualDiskOffline(fingerprint, vdID);
    }

    /**
     * Add remote virtual disk
     * */
    onCreateVirtualDisk(vd: VirtualDiskData){
        // TODO check
        this.servs.virtualDiskWorkerActions.addRemoteVirtualDisk(vd);
    }

    /**
     * Remove remote or local virtual disk
     * */
    onRemoveVirtualDisk(vdID: string){
        // TODO check
        // remove vd by worker
        if(this.servs.virtualDiskWorkerActions.getLocalVirtualDisk(vdID))
            this.servs.virtualDiskWorkerActions.removeLocalVirtualDisk(vdID);
        else
            this.servs.virtualDiskWorkerActions.removeRemoteVirtualDisk(vdID);
    }

    onWebRTCOfferReceived(sourceID: string, fingerprint: string, offer: string){
        // TODO check
        this.servs.webrtcWorkerActions.answerToOffer(fingerprint, sourceID, offer);
    }

    onWebRTCAnswerReceived(sourceID: string, fingerprint: string, answer: string){
        // TODO check
        this.servs.webrtcWorkerActions.setRemoteAnswer(sourceID, fingerprint, answer);
    }

    onWebRTCCandidateReceived(sourceID: string, fingerprint: string, candidate: string){
        // TODO check
        this.servs.webrtcWorkerActions.setCandidate(sourceID, fingerprint, candidate);
    }
}

export type $SocketListenersHandlers = {socketListenersHandlers: SocketListenersHandlers}
