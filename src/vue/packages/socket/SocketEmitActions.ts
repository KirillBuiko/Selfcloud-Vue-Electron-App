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

    async getVirtualDisks(): Promise<VirtualDiskData[]>{
        // get-virtual-disks
        return new Promise((resolve, reject) => {
            this.socket.timeout(5000).emit("get-virtual-disks", (err, vds) => {
                if(err){
                    reject(err);
                }
                resolve(vds);
            })
        })
    }

    provideVirtualDisks(vdIDs: string[]){
        // provide-virtual-disks
        this.socket.timeout(5000).emit("provide-virtual-disks", vdIDs);
    }

    revokeVirtualDisks(vdIDs: string[]){
        // provide-virtual-disks
        this.socket.timeout(5000).emit("provide-virtual-disks", vdIDs);
    }

    createVirtualDisk(): Promise<VirtualDiskData>{
        // create-virtual-disk
        return new Promise((resolve, reject) => {
            this.socket.timeout(5000).emit("create-virtual-disk", (err, vd) => {
                if(err){
                    reject(err);
                }
                resolve(vd);
            })
        })
    }

    removeVirtualDisk(vdID: string){
        // remove-virtual-disk
        this.socket.emit("remove-virtual-disk", vdID);
    }

    connectToDevice(targetID: string, fingerprint: string, offer: string){
        // connect-webrtc
        this.socket.emit("connect-webrtc", targetID, fingerprint, offer);
    }

    acceptConnectionToDevice(targetID: string, fingerprint: string, answer: string){
        // connect-webrtc-answer
        this.socket.emit("connect-webrtc-answer", targetID, fingerprint, answer);
    }

    sendWebRTCCandidate(targetID: string, fingerprint: string, candidate: string){
        // send-webrtc-candidate
        this.socket.emit("send-webrtc-candidate", targetID, fingerprint, candidate);
    }
}