import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {IVirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {LocalVirtualDiskConfig, RemoteVirtualDiskConfig, VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {$VirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import type {$AuthStore} from "@/packages/request/IAuthStore";

export class VirtualDiskWorkerActions implements IVirtualDiskWorkerActions {
    constructor(private deps: $WebRTCWorkerActions & $VirtualDisksStore & $SocketEmitActions & $AuthStore) {
    }

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
            const vd = await this.deps.socketEmitActions.createVirtualDisk(vdConfig.name);
            const config: LocalVirtualDiskConfig = {
                vdID: vd.vdID,
                ...vdConfig
            }
            this.deps.virtualDiskStore.addLocal(config);
        } catch (e) {
            // TODO: Exception handle
        }
    }

    syncVirtualDisks(vds: VirtualDiskData[]): void {
        const fingerprint = this.deps.authStore.fingerprint.value;
        const locals: Set<string> = new Set();
        const remotes: Set<string> = new Set();

        console.log(fingerprint, vds);
        vds.forEach((vd: VirtualDiskData) => {
            const isLocal = (vd.fingerprint === fingerprint);
            (isLocal ? locals : remotes).add(vd.vdID);
            if (this.getLocalVirtualDisk(vd.vdID)) return;
            if (!this.getLocalVirtualDisk(vd.vdID) && isLocal) {
                console.log("REMOVE")
                this.deps.socketEmitActions.removeVirtualDisk(vd.vdID);
                return;
            }
            this.addRemoteVirtualDisk(vd);
            if (vd.isOnline)
                this.setRemoteVirtualDisksProvided(vd.fingerprint, [vd.vdID]);
        })
        this.getAllRemoteVirtualDisks().forEach((value, key) => {
            if (!remotes.has(key)) this.removeRemoteVirtualDisk(key);
        })
        this.getAllLocalVirtualDisks().forEach((value, key) => {
            if (!locals.has(key)) this.removeLocalVirtualDisk(key);
        })
    }

    /**
     * Delete socket id and fingerprint on virtual disks, set offline
     * */
    setRemoteDeviceOffline(fingerprint: string): void {
        // TODO check
        this.deps.virtualDiskStore.getAll(true).value.forEach((vd) => {
            if (vd.getConfig().fingerprint === fingerprint) {
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
            const vd = this.deps.virtualDiskStore.get(vdID, true);
            if (vd) {
                vd.setRemoteReady(true);
                this.deps.virtualDiskStore.editConfig(vdID, {fingerprint} as RemoteVirtualDiskConfig, true);
            }
        })
    }

    /**
     * Set virtual disk offline
     * */
    setRemoteVirtualDiskOffline(fingerprint: string, vdID: string): void {
        // TODO check
        this.deps.virtualDiskStore.get(vdID, true)?.setRemoteReady(false);
        if (this.countReadyVDsOnDevice(fingerprint) == 0)
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
    removeLocalVirtualDisk(vdID: string, doSocketEmit = true): void {
        // TODO check
        this.deps.virtualDiskStore.remove(vdID);
        if (doSocketEmit)
            this.deps.socketEmitActions.removeVirtualDisk(vdID);
    }

    /**
     * Remove webrtc connection and remote virtual disk
     * */
    removeRemoteVirtualDisk(vdID: string, doSocketEmit = true): void {
        // TODO check
        const vd = this.deps.virtualDiskStore.get(vdID, true);
        if (doSocketEmit)
            this.deps.socketEmitActions.removeVirtualDisk(vdID);
        if (vd) {
            this.deps.virtualDiskStore.remove(vdID);
            if (this.countReadyVDsOnDevice(vd.getConfig().fingerprint) == 0)
                this.deps.webrtcWorkerActions.removeConnectionToRemote(vd.getConfig().fingerprint);
        }
    }

    getAllLocalVirtualDisks(): Map<string, LocalVirtualDiskClass> {
        return this.deps.virtualDiskStore.getAll(false).value;
    }

    getAllRemoteVirtualDisks(): Map<string, RemoteVirtualDiskClass> {
        return this.deps.virtualDiskStore.getAll(true).value;
    }

    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined {
        return this.deps.virtualDiskStore.get(vdID, false);
    }

    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass | undefined {
        return this.deps.virtualDiskStore.get(vdID, true);
    }

    countReadyVDsOnDevice(fingerprint: string): number {
        let count = 0;
        this.getAllRemoteVirtualDisks().forEach(vd => {
            if (vd.getConfig().fingerprint === fingerprint && vd.remoteStates.isRemoteReady) count++
        })
        return count;
    }
}
