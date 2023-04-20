import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {
    IVirtualDiskWorkerActions
} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {LocalVirtualDiskConfig, VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {$VirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import type {$AuthStore} from "@/packages/request/IAuthStorage";

export class VirtualDiskWorkerActions implements IVirtualDiskWorkerActions{
    constructor(private deps: $WebRTCWorkerActions & $VirtualDisksStore & $SocketEmitActions & $AuthStore) {}

    /**
     * Add remote virtual disk in config by store action
     * */
    addRemoteVirtualDisk(vd: VirtualDiskData): void {
        // TODO check
        this.deps.virtualDiskStore.addRemote(vd);
    }

    /**
     * Send create virtual disk message to socket,
     * add local virtual disk in store
     * */
    async createLocalVirtualDisk(vdConfig: Omit<LocalVirtualDiskConfig, "vdID">): Promise<void> {
        // TODO check
        try {
            const vd = await this.deps.socketEmitActions.createVirtualDisk();
            const config: LocalVirtualDiskConfig = {
                vdID: vd.vdID,
                ...vdConfig
            }
            this.deps.virtualDiskStore.addLocal(config);
        }
        catch (e) {
            // TODO: Exception handle
        }
    }

    syncVirtualDisks(vds: VirtualDiskData[]): void {
        const fingerprint = this.deps.authStore.fingerprint.value;
        vds.forEach((vd: VirtualDiskData) => {
            if(this.getLocalVirtualDisk(vd.vdID)) return;
            if(!this.getLocalVirtualDisk(vd.vdID) && (vd.fingerprint === fingerprint)) {
                this.deps.socketEmitActions.removeVirtualDisk(vd.vdID);
                return;
            }
            this.addRemoteVirtualDisk(vd);
            if(vd.isOnline)
                this.setRemoteVirtualDisksProvided(vd.fingerprint, [vd.vdID]);
        })
    }

    /**
     * Delete socket id and fingerprint on virtual disks, set offline
     * */
    setRemoteDeviceOffline(fingerprint: string): void {
        // TODO check
        this.deps.virtualDiskStore.getAllRemote().forEach((vd) => {
            if(vd.getConfig().fingerprint === fingerprint){
                vd.setRemoteConnected(false);
                vd.setRemoteReady(false);
            }
        })
    }

    /**
     * Create webrtc connection, set socket id and fingerprint on virtual disks, set online
     * */
    setRemoteVirtualDisksProvided(fingerprint: string, vdIDs: string[]): void {
        // TODO check
        this.deps.webrtcWorkerActions.createConnection(fingerprint);
        vdIDs.forEach(vdID => {
            const vd = this.deps.virtualDiskStore.getRemote(vdID);
            if(vd) {
                vd.setRemoteReady(true);
                this.deps.virtualDiskStore.editRemoteConfig(vdID, {
                    fingerprint
                });
            }
        })
    }

    /**
     * Set virtual disk offline
     * */
    setRemoteVirtualDiskOffline(fingerprint: string, vdID: string): void{
        // TODO check
        this.deps.virtualDiskStore.getRemote(vdID)?.setRemoteReady(false);
        if(this.countReadyVDsOnDevice(fingerprint) == 0)
            this.deps.webrtcWorkerActions.removeConnectionToRemote(fingerprint);
    }

    /**
     * Send socket provide message
     * */
    provideLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.deps.socketEmitActions.provideVirtualDisks([vdID]);
    }

    /**
     * Send socket revoke message
     * */
    revokeLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.deps.socketEmitActions.revokeVirtualDisk(vdID);
    }

    /**
     * Remove local virtual disk and send message to socket
     * */
    removeLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.deps.virtualDiskStore.removeLocal(vdID);
        this.deps.socketEmitActions.removeVirtualDisk(vdID);
    }

    /**
     * Remove webrtc connection and remote virtual disk
     * */
    removeRemoteVirtualDisk(vdID: string): void {
        // TODO check
        const vd = this.deps.virtualDiskStore.getRemote(vdID);
        if(vd){
            this.deps.virtualDiskStore.removeRemote(vdID);
            if(this.countReadyVDsOnDevice(vd.getConfig().fingerprint) == 0)
                this.deps.webrtcWorkerActions.removeConnectionToRemote(vd.getConfig().fingerprint);
        }
    }

    getAllLocalVirtualDisks(): Map<string, LocalVirtualDiskClass> {
        return this.deps.virtualDiskStore.getAllLocal();
    }

    getAllRemoteVirtualDisks(): Map<string, RemoteVirtualDiskClass> {
        return this.deps.virtualDiskStore.getAllRemote();
    }

    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined {
        return this.deps.virtualDiskStore.getLocal(vdID);
    }

    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass | undefined {
        return this.deps.virtualDiskStore.getRemote(vdID);
    }

    countReadyVDsOnDevice(fingerprint: string): number {
        let count = 0;
        this.getAllRemoteVirtualDisks().forEach(vd => {
            if (vd.getConfig().fingerprint === fingerprint && vd.isRemoteReady) count++
        })
        return count;
    }
}
