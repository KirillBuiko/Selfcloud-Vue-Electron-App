import {defineStore} from "pinia";
import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {LocalVirtualDiskConfig, RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import type {IVirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes";

export const useVirtualDiskStore = defineStore<"virtualDisk", object,
    {[ind: string]: any}, IVirtualDisksStore>('virtualDisk', {
    state: () => ({
        remoteVirtualDisksConfig: [] as RemoteVirtualDiskConfig[],
        localVirtualDisksConfig: [] as LocalVirtualDiskConfig[],
        remoteVirtualDisks: new Map<string, RemoteVirtualDiskClass>(),
        localVirtualDisks: new Map<string, LocalVirtualDiskClass>(),
    }),
    actions: {
        getRemoteVirtualDisk: (vdID: string): RemoteVirtualDiskClass | undefined => {
            // TODO
            return undefined;
        },
        getLocalVirtualDisk: (vdID: string): LocalVirtualDiskClass | undefined => {
            // TODO
            return undefined;
        },
        getAllRemoteVirtualDisks: (): RemoteVirtualDiskClass[] => {
            // TODO
            return [];
        },
        getAllLocalVirtualDisks: (): LocalVirtualDiskClass[] => {
            // TODO
            return [];
        },
        addRemoteVirtualDisk: (vd: VirtualDiskData): void => {
            // TODO
        },
        addLocalVirtualDisk: (vd: LocalVirtualDiskConfig): void => {
            // TODO
        },
        removeLocalVirtualDisk(vdID: string): void {
            // TODO
        },
        removeRemoteVirtualDisk(vdID: string): void {
            // TODO
        }
    }
})
