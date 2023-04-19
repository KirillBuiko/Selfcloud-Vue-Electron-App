import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {LocalVirtualDiskConfig, VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import type {Ref} from "vue";

export interface IVirtualDisksStore {
    remoteVirtualDisksConfig: Ref<{ [ind: string]: RemoteVirtualDiskConfig }>;
    localVirtualDisksConfig: Ref<{ [ind: string]: LocalVirtualDiskConfig }>;
    remoteVirtualDisks: Ref<Map<string, RemoteVirtualDiskClass>>;
    localVirtualDisks: Ref<Map<string, LocalVirtualDiskClass>>;

    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass | undefined,

    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined,

    getAllRemoteVirtualDisks(): Map<string, RemoteVirtualDiskClass>,

    getAllLocalVirtualDisks(): Map<string, LocalVirtualDiskClass>,

    addRemoteVirtualDisk(vd: VirtualDiskData): void,

    addLocalVirtualDisk(vd: LocalVirtualDiskConfig): void,

    removeLocalVirtualDisk(vdID: string): void,

    removeRemoteVirtualDisk(vdID: string): void,

    editLocalVDConfig(vdID: string, editObject: Partial<LocalVirtualDiskConfig>): void,

    editRemoteVDConfig(vdID: string, editObject: Partial<RemoteVirtualDiskConfig>): void,
}

export type $VirtualDisksStore = {virtualDiskStore: IVirtualDisksStore}