import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {LocalVirtualDiskConfig, VirtualDiskData} from "@/types/VirtualDisksTypes";

export interface IVirtualDisksStore {
    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass | undefined,

    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined,

    getAllRemoteVirtualDisks(): RemoteVirtualDiskClass[],

    getAllLocalVirtualDisks(): LocalVirtualDiskClass[],

    addRemoteVirtualDisk(vd: VirtualDiskData): void,

    addLocalVirtualDisk(vd: LocalVirtualDiskConfig): void,

    removeLocalVirtualDisk(vdID: string): void,

    removeRemoteVirtualDisk(vdID: string): void
}