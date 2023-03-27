import type {SCSocket} from "@/types/SocketTypes";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {IWebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import {WebRTCWorkerActions} from "@/packages/webrtc/WebRTCWorkerActions";

export class SocketEmitActions {
    webrtcWorkerActions: IWebRTCWorkerActions;

    constructor(private socket: SCSocket) {
        this.webrtcWorkerActions = new WebRTCWorkerActions();
    }

    initConnection(){
        // connected
    }

    /**
     * Get and return virtual disks
     * */
    async getVirtualDisks(): Promise<VirtualDiskData[]>{
        // TODO check
        return new Promise((resolve, reject) => {
            this.socket.timeout(5000).emit("get-virtual-disks", (err, vds) => {
                if(err){
                    reject(err);
                }
                resolve(vds);
            })
        })
    }

    /**
     * Provide virtual disks
     * */
    provideVirtualDisks(vdIDs: string[]){
        // TODO check
        this.socket.emit("provide-virtual-disks", vdIDs);
    }

    /**
     * Revoke virtual disks
     * */
    revokeVirtualDisk(vdID: string){
        // TODO check
        this.socket.emit("revoke-virtual-disk", vdID);
    }

    /**
     * Create virtual disk and return virtual disk data
     * */
    createVirtualDisk(): Promise<VirtualDiskData>{
        // TODO check
        return new Promise((resolve, reject) => {
            this.socket.timeout(5000).emit("create-virtual-disk", (err, vd) => {
                if(err){
                    reject(err);
                }
                resolve(vd);
            })
        })
    }

    /**
     * Remove virtual disk
     * */
    removeVirtualDisk(vdID: string){
        // TODO check
        this.socket.emit("remove-virtual-disk", vdID);
    }

    /**
     * Connect webrtc
     * */
    connectToDevice(targetID: string, fingerprint: string, offer: string){
        // TODO check
        this.socket.emit("connect-webrtc", targetID, fingerprint, offer);
    }

    /**
     * Send webrtc answer
     * */
    acceptConnectionToDevice(targetID: string, fingerprint: string, answer: string){
        // TODO check
        this.socket.emit("connect-webrtc-answer", targetID, fingerprint, answer);
    }

    /**
     * Send webrtc candidate
     * */
    sendWebRTCCandidate(targetID: string, fingerprint: string, candidate: string){
        // TODO check
        this.socket.emit("send-webrtc-candidate", targetID, fingerprint, candidate);
    }
}