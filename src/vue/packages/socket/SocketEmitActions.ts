import type {VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$SocketStore} from "@/stores/SoketStore";

export class SocketEmitActions {
    constructor(private deps: $WebRTCWorkerActions & $SocketStore) {}

    initConnection(){
        // connected
    }

    /**
     * Get and return virtual disks
     * */
    async getVirtualDisks(): Promise<VirtualDiskData[]>{
        // TODO check
        return new Promise((resolve, reject) => {
            this.deps.socketStore.socket.timeout(5000).emit("get-virtual-disks", (err, vds) => {
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
        this.deps.socketStore.socket.emit("provide-virtual-disks", vdIDs);
    }

    /**
     * Revoke virtual disks
     * */
    revokeVirtualDisk(vdID: string){
        // TODO check
        this.deps.socketStore.socket.emit("revoke-virtual-disk", vdID);
    }

    /**
     * Create virtual disk and return virtual disk data
     * */
    createVirtualDisk(): Promise<VirtualDiskData>{
        // TODO check
        return new Promise((resolve, reject) => {
            this.deps.socketStore.socket.timeout(5000).emit("create-virtual-disk", (err, vd) => {
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
        this.deps.socketStore.socket.emit("remove-virtual-disk", vdID);
    }

    /**
     * Connect webrtc
     * */
    connectToDevice(targetID: string, fingerprint: string, offer: string){
        // TODO check
        this.deps.socketStore.socket.emit("connect-webrtc", targetID, fingerprint, offer);
    }

    /**
     * Send webrtc answer
     * */
    acceptConnectionToDevice(targetID: string, fingerprint: string, answer: string){
        // TODO check
        this.deps.socketStore.socket.emit("connect-webrtc-answer", targetID, fingerprint, answer);
    }

    /**
     * Send webrtc candidate
     * */
    sendWebRTCCandidate(targetID: string, fingerprint: string, candidate: string){
        // TODO check
        this.deps.socketStore.socket.emit("send-webrtc-candidate", targetID, fingerprint, candidate);
    }
}

export type $SocketEmitActions = {socketEmitActions: SocketEmitActions}
