import {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {LocalVirtualDiskConfig, RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import type {IVirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes";
import {useLocalStorage} from "@vueuse/core";
import {ref} from "vue";

export class VirtualDisksStore implements IVirtualDisksStore{
    readonly remoteVirtualDisksConfig =
        useLocalStorage<{ [ind: string]: RemoteVirtualDiskConfig }>("remoteVirtualDisksConfig", {});
    readonly localVirtualDisksConfig =
        useLocalStorage<{ [ind: string]: LocalVirtualDiskConfig }>("localVirtualDisksConfig", {});
    readonly remoteVirtualDisks = ref(new Map<string, RemoteVirtualDiskClass>());
    readonly localVirtualDisks = ref(new Map<string, LocalVirtualDiskClass>());

    constructor(){
        this.initVirtualDisks();
    }

    initVirtualDisks() {
        for(const key in this.localVirtualDisksConfig.value) {
            const config = this.localVirtualDisksConfig.value[key];
            const vd = new LocalVirtualDiskClass(config);
            vd.check();
            this.localVirtualDisks.value.set(config.vdID, vd);
        }

        for(const key in this.remoteVirtualDisksConfig.value) {
            const config = this.remoteVirtualDisksConfig.value[key];
            const vd = new RemoteVirtualDiskClass(config);
            vd.check();
            this.remoteVirtualDisks.value.set(config.vdID, vd);
        }
    }

    getRemote(vdID: string): RemoteVirtualDiskClass | undefined {
        return this.remoteVirtualDisks.value.get(vdID);
    }

    getLocal(vdID: string): LocalVirtualDiskClass | undefined {
        return this.localVirtualDisks.value.get(vdID);
    }

    getAllRemote(): Map<string, RemoteVirtualDiskClass> {
        return this.remoteVirtualDisks.value;
    }

    getAllLocal(): Map<string, LocalVirtualDiskClass> {
        return this.localVirtualDisks.value;
    }

    addRemote(vdData: VirtualDiskData): void {
        if(this.getRemote(vdData.vdID)) {
            Object.assign(this.remoteVirtualDisksConfig.value[vdData.vdID], vdData)
            this.remoteVirtualDisks.value.get(vdData.vdID)?.setConfig(this.remoteVirtualDisksConfig.value[vdData.vdID]);
        }
        else {
            // TODO: Get default configs from FileWorker
            const config: RemoteVirtualDiskConfig = {
                ...vdData,
                name: "Remote Disk 1",
                localPath: "",
                remainedSizeBytes: 0,
                totalSizeBytes: 0
            }
            const newVD = new RemoteVirtualDiskClass(config);
            newVD.check();
            this.localVirtualDisks.value.set(config.vdID, newVD);
        }
    }

    addLocal(vdConfig: LocalVirtualDiskConfig): void {
        if(this.getRemote(vdConfig.vdID))
            this.removeLocal(vdConfig.vdID);
        const vd = new LocalVirtualDiskClass(vdConfig);
        vd.check();
        this.localVirtualDisks.value.set(vdConfig.vdID, vd);
    }

    removeLocal(vdID: string): void {
        this.localVirtualDisks.value.delete(vdID);
        delete this.localVirtualDisksConfig.value[vdID];
    }

    removeRemote(vdID: string): void {
        this.remoteVirtualDisks.value.delete(vdID);
        delete this.remoteVirtualDisksConfig.value[vdID];
    }

    editLocalConfig(vdID: string, editObject: Partial<LocalVirtualDiskConfig>): void {
        Object.assign(this.remoteVirtualDisksConfig.value[vdID], editObject)
        this.remoteVirtualDisks.value.get(vdID)?.setConfig(this.remoteVirtualDisksConfig.value[vdID]);
    }

    editRemoteConfig(vdID: string, editObject: Partial<RemoteVirtualDiskConfig>): void {
        Object.assign(this.remoteVirtualDisksConfig.value[vdID], editObject)
        this.remoteVirtualDisks.value.get(vdID)?.setConfig(this.remoteVirtualDisksConfig.value[vdID]);
    }
}
