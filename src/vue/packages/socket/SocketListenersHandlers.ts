import type {SCSocket} from "@/types/SocketTypes";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {IWebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import {WebRTCWorkerActions} from "@/packages/webrtc/WebRTCWorkerActions";
import type {IVirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import {SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import {VirtualDiskWorkerActions} from "@/packages/virtual-disk/VirtualDiskWorkerActions";

export class SocketListenersHandlers{
    webrtcWorkerActions: IWebRTCWorkerActions;
    virtualDiskWorkerActions: IVirtualDiskWorkerActions;
    socketEmitActions: SocketEmitActions;

    constructor(private socket: SCSocket) {
        this.webrtcWorkerActions = new WebRTCWorkerActions();
        this.virtualDiskWorkerActions = new VirtualDiskWorkerActions();
        this.socketEmitActions = new SocketEmitActions(socket);
    }

    /**
     * Get virtual disks from socket, set online to them,
     * provide all ready local virtual disks
     * */
    onConnected(){
        // TODO check
        this.socketEmitActions.getVirtualDisks().then((vds: VirtualDiskData[]) => {
            vds.forEach((vd: VirtualDiskData) => {
                if(this.virtualDiskWorkerActions.getLocalVirtualDisk(vd.vdID)) return;
                this.virtualDiskWorkerActions.addRemoteVirtualDisk(vd);
                if(vd.isOnline)
                    this.virtualDiskWorkerActions.setRemoteVirtualDisksOnline(vd.socketID, vd.fingerprint, [vd.vdID]);
            })
        }).catch(() => {
            //
        });
        const readyList: string[] = [];
        this.virtualDiskWorkerActions.getAllLocalVirtualDisks().forEach((vd) => {
            const config = vd.getConfig();
            if(config.readyForConnection)
                readyList.push(config.vdID);
        });
        this.socketEmitActions.provideVirtualDisks(readyList);
    }


    onDisconnected(){
        // TODO check
    }

    /**
     * Set offline to all this device's vd
     * */
    onDeviceDisconnected(fingerprint: string){
        // TODO check
        this.virtualDiskWorkerActions.setRemoteDeviceOffline(fingerprint);
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
        this.virtualDiskWorkerActions.setRemoteVirtualDisksOnline(socketID, fingerprint, vdIDs);
    }

    /**
     * Set remote virtual disk offline
     * */
    onRevokeVirtualDisk(fingerprint: string, vdID: string){
        // TODO check
        this.virtualDiskWorkerActions.setRemoteVirtualDiskOffline(fingerprint, vdID);
    }

    /**
     * Add remote virtual disk
     * */
    onCreateVirtualDisk(vd: VirtualDiskData){
        // TODO check
        this.virtualDiskWorkerActions.addRemoteVirtualDisk(vd);
    }

    /**
     * Remove remote or local virtual disk
     * */
    onRemoveVirtualDisk(vdID: string){
        // TODO check
        // remove vd by worker
        if(this.virtualDiskWorkerActions.getLocalVirtualDisk(vdID))
            this.virtualDiskWorkerActions.removeLocalVirtualDisk(vdID);
        else
            this.virtualDiskWorkerActions.removeRemoteVirtualDisk(vdID);
    }

    onWebRTCOfferReceived(sourceID: string, fingerprint: string, offer: string){
        // TODO check
        this.webrtcWorkerActions.answerToOffer(fingerprint, sourceID, offer);
    }

    onWebRTCAnswerReceived(sourceID: string, fingerprint: string, answer: string){
        // TODO check
        this.webrtcWorkerActions.setRemoteAnswer(sourceID, fingerprint, answer);
    }

    onWebRTCCandidateReceived(sourceID: string, fingerprint: string, candidate: string){
        // TODO check
        this.webrtcWorkerActions.setCandidate(sourceID, fingerprint, candidate);
    }
}