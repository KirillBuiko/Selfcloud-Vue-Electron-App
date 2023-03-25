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

    onConnected(){
        // TODO check
        // set socket state to online
        // get vds and configure
        // provide all ready vd
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
        // set socket state to offline
    }

    onDeviceDisconnected(fingerprint: string){
        // TODO check
        // set offline to all this device's vd
        this.virtualDiskWorkerActions.setRemoteDeviceOffline(fingerprint);
        // this.virtualDiskWorkerActions.getAllRemoteVirtualDisks().forEach((vd: IRemoteVirtualDisk) => {
        //     if(vd.getConfig().fingerprint === fingerprint)
        //         vd.setOffline();
        // });
    }

    onDeviceConnected(socketID: string, fingerprint: string){
        // TODO check
        // nothing?
    }

    onProvideVirtualDisks(socketID: string, fingerprint: string, vdIDs: string[]){
        // TODO check
        // set socketID and fingerprint to vds, set online by vd
        this.virtualDiskWorkerActions.setRemoteVirtualDisksOnline(socketID, fingerprint, vdIDs);
    }

    onRevokeVirtualDisk(fingerprint: string, vdID: string){
        // TODO check
        // set vd offline by vd
        this.virtualDiskWorkerActions.setRemoteVirtualDiskOffline(fingerprint, vdID);
    }

    onCreateVirtualDisk(vd: VirtualDiskData){
        // TODO check
        // add vd by worker
        this.virtualDiskWorkerActions.addRemoteVirtualDisk(vd);
    }

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
        // to webrtc worker
        this.webrtcWorkerActions.answerToOffer(sourceID, fingerprint, offer);
    }

    onWebRTCAnswerReceived(sourceID: string, fingerprint: string, answer: string){
        // TODO check
        // to webrtc worker
        this.webrtcWorkerActions.setRemoteAnswer(sourceID, fingerprint, answer);
    }

    onWebRTCCandidateReceived(sourceID: string, fingerprint: string, candidate: string){
        // TODO check
        // to webrtc worker
        this.webrtcWorkerActions.setCandidate(sourceID, fingerprint, candidate);
    }
}