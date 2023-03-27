import type {IVirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {LocalVirtualDiskConfig, VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {IWebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import {WebRTCWorkerActions} from "@/packages/webrtc/WebRTCWorkerActions";
import {useVirtualDiskStore} from "@/stores/virtualDiskStore";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {IVirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import {SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import {useSocketStore} from "@/stores/soketStore";
import type {SCSocket} from "@/types/SocketTypes";

export class VirtualDiskWorkerActions implements IVirtualDiskWorkerActions{
    webrtcWorkerActions: IWebRTCWorkerActions;
    virtualDiskStore: IVirtualDisksStore;
    socketEmitActions: SocketEmitActions;

    constructor() {
        this.webrtcWorkerActions = new WebRTCWorkerActions();
        this.virtualDiskStore = useVirtualDiskStore();
        this.socketEmitActions = new SocketEmitActions(useSocketStore().socket as SCSocket);
    }

    /**
     * Add remote virtual disk in config by store action
     * */
    addRemoteVirtualDisk(vd: VirtualDiskData): void {
        // TODO check
        this.virtualDiskStore.addRemoteVirtualDisk(vd);
    }

    /**
     * Send create virtual disk message to socket,
     * add local virtual disk in store
     * */
    async createLocalVirtualDisk(vdConfig: Omit<LocalVirtualDiskConfig, "vdID">): Promise<void> {
        // TODO check
        const vd = await this.socketEmitActions.createVirtualDisk();
        const config: LocalVirtualDiskConfig = {
            vdID: vd.vdID,
            ...vdConfig
        }
        this.virtualDiskStore.addLocalVirtualDisk(config);
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
        this.virtualDiskStore.getAllRemoteVirtualDisks().forEach((vd) => {
            if(vd.getConfig().fingerprint === fingerprint)
                vd.setOffline();
        })
    }

    /**
     * Create webrtc connection, set socket id and fingerprint on virtual disks, set online
     * */
    setRemoteVirtualDisksOnline(socketID: string, fingerprint: string, vdIDs: string[]): void {
        // TODO check
        this.webrtcWorkerActions.createConnection(fingerprint, socketID);
        vdIDs.forEach(vdID => {
            const vd = this.virtualDiskStore.getRemoteVirtualDisk(vdID);
            if(vd) vd.setOnline(socketID, fingerprint);
        })
    }

    /**
     * Set virtual disk offline
     * */
    setRemoteVirtualDiskOffline(fingerprint: string, vdID: string): void{
        // TODO check
        const vd = this.virtualDiskStore.getRemoteVirtualDisk(vdID);
        if(vd) vd.setOffline()
    }

    /**
     * Send socket provide message, set readyForConnection in virtual disk to true
     * */
    provideLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.socketEmitActions.provideVirtualDisks([vdID]);
        const vd = this.virtualDiskStore.getLocalVirtualDisk(vdID);
        if(vd) vd.getConfig().readyForConnection = true;
    }

    /**
     * Send socket revoke message, set readyForConnection in virtual disk to false
     * */
    revokeLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.socketEmitActions.revokeVirtualDisk(vdID);
        const vd = this.virtualDiskStore.getLocalVirtualDisk(vdID);
        if(vd) vd.getConfig().readyForConnection = false;
    }

    /**
     * Remove local virtual disk and send message to socket
     * */
    removeLocalVirtualDisk(vdID: string): void {
        // TODO check
        this.virtualDiskStore.removeLocalVirtualDisk(vdID);
        this.socketEmitActions.removeVirtualDisk(vdID);
    }

    /**
     * Remove webrtc connection and remote virtual disk
     * */
    removeRemoteVirtualDisk(vdID: string): void {
        // TODO check
        const vd = this.virtualDiskStore.getRemoteVirtualDisk(vdID);
        if(vd){
            this.webrtcWorkerActions.removeConnectionToRemote(vd.getConfig().fingerprint);
            this.virtualDiskStore.removeRemoteVirtualDisk(vdID);
        }
    }

    getAllLocalVirtualDisks(): LocalVirtualDiskClass[] {
        return this.virtualDiskStore.getAllLocalVirtualDisks();
    }

    getAllRemoteVirtualDisks(): RemoteVirtualDiskClass[] {
        return this.virtualDiskStore.getAllRemoteVirtualDisks();
    }

    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined {
        return this.virtualDiskStore.getLocalVirtualDisk(vdID);
    }

    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass | undefined {
        return this.virtualDiskStore.getRemoteVirtualDisk(vdID);
    }
}