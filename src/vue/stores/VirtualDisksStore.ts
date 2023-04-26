import {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {
    LocalVirtualDiskConfig,
    RemoteVirtualDiskConfig,
    VirtualDiskConfigStoreObject,
    VirtualDiskData,
    VirtualDiskStoreObject
} from "@/types/VirtualDisksTypes";
import type {IVirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import {useLocalStorage} from "@vueuse/core";
import {ref} from "vue";

export class VirtualDisksStore implements IVirtualDisksStore {
    readonly virtualDisksConfig =
        useLocalStorage<VirtualDiskConfigStoreObject>("virtualDisksConfig", {});
    readonly virtualDisks = ref(new Map<string, VirtualDiskStoreObject>());

    constructor() {
        this.initVirtualDisks();
    }

    initVirtualDisks() {
        for (const key in this.virtualDisksConfig.value) {
            const configObject = this.virtualDisksConfig.value[key];
            const vd = configObject.isRemote
                ? new LocalVirtualDiskClass(configObject.config as LocalVirtualDiskConfig)
                : new RemoteVirtualDiskClass(configObject.config as RemoteVirtualDiskConfig);
            vd.check();
            this.virtualDisks.value.set(configObject.config.vdID, vd);
        }
    }

    get<R extends boolean, T extends R extends false ? LocalVirtualDiskClass : RemoteVirtualDiskClass>
    (vdID: string, isRemote: R): T | undefined {
        const vd = this.virtualDisks.value.get(vdID);
        if (!vd || (isRemote !== vd instanceof RemoteVirtualDiskClass)) return undefined;
        return vd as T;
    }

    getAll<R extends boolean, T extends R extends false ? LocalVirtualDiskClass : RemoteVirtualDiskClass>(isRemote: R):
        Map<string, T> {
        const resMap = new Map<string, T>();
        this.virtualDisks.value.forEach((value, key) => {
            if (isRemote == (value instanceof RemoteVirtualDiskClass))
                resMap.set(key, value as T);
        })
        return resMap;
    }

    addRemote(vdData: VirtualDiskData): void {
        if (this.get(vdData.vdID, true)) {
            this.editConfig(vdData.vdID, vdData, true);
        } else {
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
            this.virtualDisks.value.set(config.vdID, newVD);
        }
    }

    addLocal(vdConfig: LocalVirtualDiskConfig): void {
        if (this.get(vdConfig.vdID, false))
            this.remove(vdConfig.vdID);
        const vd = new LocalVirtualDiskClass(vdConfig);
        vd.check();
        this.virtualDisks.value.set(vdConfig.vdID, vd);
    }

    remove(vdID: string): void {
        this.virtualDisks.value.delete(vdID);
        delete this.virtualDisksConfig.value[vdID];
    }

    editConfig<R extends boolean, T extends R extends false ? LocalVirtualDiskConfig : RemoteVirtualDiskConfig>
    (vdID: string, editObject: Partial<T>, isRemote: R): void {
        if (!this.virtualDisksConfig.value[vdID]) return;
        if (isRemote == this.virtualDisksConfig.value[vdID].isRemote) {
            Object.assign(this.virtualDisksConfig.value[vdID].config, editObject);
            this.virtualDisks.value.get(vdID)?.setConfig(this.virtualDisksConfig.value[vdID].config);
        }
    }
}
