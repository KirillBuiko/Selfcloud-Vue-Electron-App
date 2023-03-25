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

    addRemoteVirtualDisk(vd: VirtualDiskData): void {
        // TODO check
        // add vd in config by store action
        this.virtualDiskStore.addRemoteVirtualDisk(vd);
    }

    async createLocalVirtualDisk(vdConfig: Omit<LocalVirtualDiskConfig, "vdID">): Promise<void> {
        // TODO check
        // send create virtual disk message to socket
        // get vd data
        // add vd in config by store action
        // check configs (not here)
        // provide vd (not here)
        const vd = await this.socketEmitActions.createVirtualDisk();
        const config: LocalVirtualDiskConfig = {
            vdID: vd.vdID,
            ...vdConfig
        }
        this.virtualDiskStore.addLocalVirtualDisk(config);
    }

    attachRemoteVirtualDisk(vdID: string): void {
        // DEPRECATED?
        // get virtual disk
        // check virtual disk file system
        // create or get webrtc connection
        // put connection in vd by its method
    }

    setRemoteDeviceOffline(fingerprint: string): void {
        // TODO check
        // delete socket id and fingerprint on vds, isOnline to false
        this.virtualDiskStore.getAllRemoteVirtualDisks().forEach(vd => {
            if(vd.getConfig().fingerprint === fingerprint)
                vd.setOffline();
        })
    }

    setRemoteVirtualDisksOnline(socketID: string, fingerprint: string, vdIDs: string[]): void {
        // TODO check
        // set socket id and fingerprint on vds, isOnline to true
        vdIDs.forEach(vdID => {
            const vd = this.virtualDiskStore.getRemoteVirtualDisk(vdID);
            if(!vd) return;
            vd.setOnline(socketID, fingerprint);
        })
    }

    setRemoteVirtualDiskOffline(fingerprint: string, vdID: string): void{
        // TODO check
        const vd = this.virtualDiskStore.getRemoteVirtualDisk(vdID);
        if(!vd) return;
        vd.setOffline();
    }

    provideLocalVirtualDisk(vdID: string): void {
        // TODO check
        // send by socketEmitsActions provide message
        this.socketEmitActions.provideVirtualDisks([vdID]);
        const vd = this.virtualDiskStore.getLocalVirtualDisk(vdID);
        if(vd) vd.getConfig().readyForConnection = true;
    }

    revokeLocalVirtualDisk(vdID: string): void {
        // TODO check
        // send by socketEmitsActions revoke message
        // set readyForConnection in vd
        this.socketEmitActions.revokeVirtualDisks([vdID]);
        const vd = this.virtualDiskStore.getLocalVirtualDisk(vdID);
        if(vd) vd.getConfig().readyForConnection = false;
    }

    removeLocalVirtualDisk(vdID: string): void {
        // TODO
        // delete connection, if there is not other vds on the connection
        // delete vd by method
        // send message to socket
    }

    removeRemoteVirtualDisk(vdID: string): void {
        // TODO
        // if vd was local, call local remove
        // delete connection, if there is not other vds on the connection
        // delete vd by method
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