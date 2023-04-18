import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {LocalVirtualDiskConfig, VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import type {Ref} from "vue";

export interface IVirtualDisksStore {
    remoteVirtualDisksConfig: Ref<RemoteVirtualDiskConfig[]>;
    localVirtualDisksConfig: Ref<LocalVirtualDiskConfig[]>;
    remoteVirtualDisks: Ref<Map<string, RemoteVirtualDiskClass>>;
    localVirtualDisks: Ref<Map<string, LocalVirtualDiskClass>>;

    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass | undefined,

    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined,

    getAllRemoteVirtualDisks(): RemoteVirtualDiskClass[],

    getAllLocalVirtualDisks(): LocalVirtualDiskClass[],

    addRemoteVirtualDisk(vd: VirtualDiskData): void,

    addLocalVirtualDisk(vd: LocalVirtualDiskConfig): void,

    removeLocalVirtualDisk(vdID: string): void,

    removeRemoteVirtualDisk(vdID: string): void
}

export type $VirtualDiskStore = {virtualDiskStore: IVirtualDisksStore}