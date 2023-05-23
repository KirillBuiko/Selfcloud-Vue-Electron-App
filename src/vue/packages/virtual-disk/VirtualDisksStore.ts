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
import {computed, type ComputedRef, ref} from "vue";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export class VirtualDisksStore implements IVirtualDisksStore {
    readonly virtualDisksConfig =
        useLocalStorage<VirtualDiskConfigStoreObject>("virtualDisksConfig", {});
    readonly virtualDisks = ref(new Map<string, VirtualDiskStoreObject>());

    constructor(private deps: $SocketEmitActions) {
        this.initVirtualDisks();
    }

    initVirtualDisks() {
        for (const key in this.virtualDisksConfig.value) {
            const configObject = this.virtualDisksConfig.value[key];
            const vd = configObject.isRemote
                ? new RemoteVirtualDiskClass(this.deps, configObject.config as RemoteVirtualDiskConfig)
                : new LocalVirtualDiskClass(this.deps, configObject.config as LocalVirtualDiskConfig);
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
        ComputedRef<Map<string, T>> {
        return computed(() => {
            const resMap = new Map<string, T>();
            this.virtualDisks.value.forEach((value, key) => {
                if (isRemote == (value instanceof RemoteVirtualDiskClass))
                    resMap.set(key, value as T);
            })
            return resMap;
        });
    }

    addRemote(vdData: VirtualDiskData): void {
        if (this.get(vdData.vdID, true)) {
            this.editConfig(vdData.vdID, vdData, true);
        } else {
            // TODO: Get default directory from FileWorker
            const config: RemoteVirtualDiskConfig = {
                ...vdData,
                localPath: "C:\\SelfCloud\\Remote",
                remainedSizeBytes: 0,
                totalSizeBytes: 0
            }
            const vd = new RemoteVirtualDiskClass(this.deps, config);
            this.virtualDisksConfig.value[config.vdID] = {
                isRemote: true,
                config: config
            }
            vd.check();
            this.virtualDisks.value.set(config.vdID, vd);
        }
    }

    addLocal(vdConfig: LocalVirtualDiskConfig): void {
        if (this.get(vdConfig.vdID, false))
            this.remove(vdConfig.vdID);
        const vd = new LocalVirtualDiskClass(this.deps, vdConfig);
        this.virtualDisksConfig.value[vdConfig.vdID] = {
            isRemote: false,
            config: vdConfig
        }
        this.virtualDisks.value.set(vdConfig.vdID, vd);
        vd.check();
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
