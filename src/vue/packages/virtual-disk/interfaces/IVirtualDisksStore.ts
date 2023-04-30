import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {
    LocalVirtualDiskConfig,
    RemoteVirtualDiskConfig,
    VirtualDiskConfigStoreObject,
    VirtualDiskData,
    VirtualDiskStoreObject
} from "@/types/VirtualDisksTypes";
import type {ComputedRef, Ref} from "vue";

export interface IVirtualDisksStore {
    virtualDisksConfig: Ref<VirtualDiskConfigStoreObject>;
    virtualDisks: Ref<Map<string, VirtualDiskStoreObject>>;

    get<R extends boolean, T extends R extends false ? LocalVirtualDiskClass : RemoteVirtualDiskClass>
    (vdID: string, isRemote: R): T | undefined,

    getAll<R extends boolean, T extends R extends false ? LocalVirtualDiskClass : RemoteVirtualDiskClass>
    (isRemote: R): ComputedRef<Map<string, T>>,

    addRemote(vd: VirtualDiskData): void,

    addLocal(vd: LocalVirtualDiskConfig): void,

    remove(vdID: string): void,

    editConfig<R extends boolean, T extends R extends false ? LocalVirtualDiskConfig : RemoteVirtualDiskConfig>
    (vdID: string, editObject: Partial<T>, isRemote: R): void,
}

export type $VirtualDisksStore = { virtualDiskStore: IVirtualDisksStore }