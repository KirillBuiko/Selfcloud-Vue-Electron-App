import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {
    IVirtualDiskWorkerActions
} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {LocalVirtualDiskConfig, VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {$VirtualDiskStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";

export class VirtualDiskWorkerActions implements IVirtualDiskWorkerActions{
    constructor(private deps: $WebRTCWorkerActions & $VirtualDiskStore & $SocketEmitActions) {}

    /**
     * Add remote virtual disk in config by store action
     * */
    addRemoteVirtualDisk(vd: VirtualDiskData): void {
        // TODO check
        this.deps.virtualDiskStore.addRemoteVirtualDisk(vd);
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
            this.deps.virtualDiskStore.addLocalVirtualDisk(config);
        }
        catch (e) {
            // TODO: Exception handle
        }
    }

    /** @deprecated */
    attachRemoteVirtualDisk(vdID: string): void {
        // DEPRECATED?
    }

    /**
     * Delete socket id and fingerprint on virtual disks, set offline
     * */
    setRemoteDeviceOffline(fingerprint: string): void {
        // TODO check
        this.deps.virtualDiskStore.getAllRemoteVirtualDisks().forEach((vd) => {
            if(vd.getConfig().fingerprint === fingerprint)
                vd.setOffline();
        })
    }

    /**
     * Create webrtc connection, set socket id and fingerprint on virtual disks, set online
     * */
    setRemoteVirtualDisksOnline(socketID: string, fingerprint: string, vdIDs: string[]): void {
        // TODO check
        this.deps.webrtcWorkerActions.createConnection(fingerprint, socketID);
        vdIDs.forEach(vdID => {
            const vd = this.deps.virtualDiskStore.getRemoteVirtualDisk(vdID);
            if(vd) vd.setOnline(socketID, fingerprint);
        })
    }

    /**
     * Set virtual disk offline
     * */
    setRemoteVirtualDiskOffline(fingerprint: string, vdID: string): void{
        // TODO check
        const vd = this.deps.virtualDiskStore.getRemoteVirtualDisk(vdID);
        if(vd) vd.setOffline()
    }

    /**
     * Send socket provide message, set readyForConnection in virtual disk to true
     * */
    provideLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.deps.socketEmitActions.provideVirtualDisks([vdID]);
        const vd = this.deps.virtualDiskStore.getLocalVirtualDisk(vdID);
        if(vd) vd.getConfig().readyForConnection = true;
    }

    /**
     * Send socket revoke message, set readyForConnection in virtual disk to false
     * */
    revokeLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.deps.socketEmitActions.revokeVirtualDisk(vdID);
        const vd = this.deps.virtualDiskStore.getLocalVirtualDisk(vdID);
        if (vd) vd.getConfig().readyForConnection = false;
    }

    /**
     * Remove local virtual disk and send message to socket
     * */
    removeLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.deps.virtualDiskStore.removeLocalVirtualDisk(vdID);
        this.deps.socketEmitActions.removeVirtualDisk(vdID);
    }

    /**
     * Remove webrtc connection and remote virtual disk
     * */
    removeRemoteVirtualDisk(vdID: string): void {
        // TODO check
        const vd = this.deps.virtualDiskStore.getRemoteVirtualDisk(vdID);
        if(vd){
            this.deps.webrtcWorkerActions.removeConnectionToRemote(vd.getConfig().fingerprint);
            this.deps.virtualDiskStore.removeRemoteVirtualDisk(vdID);
        }
    }

    getAllLocalVirtualDisks(): LocalVirtualDiskClass[] {
        return this.deps.virtualDiskStore.getAllLocalVirtualDisks();
    }

    getAllRemoteVirtualDisks(): RemoteVirtualDiskClass[] {
        return this.deps.virtualDiskStore.getAllRemoteVirtualDisks();
    }

    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined {
        return this.deps.virtualDiskStore.getLocalVirtualDisk(vdID);
    }

    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass | undefined {
        return this.deps.virtualDiskStore.getRemoteVirtualDisk(vdID);
    }
}
