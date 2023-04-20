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

    getRemote(vdID: string): RemoteVirtualDiskClass | undefined,

    getLocal(vdID: string): LocalVirtualDiskClass | undefined,

    getAllRemote(): Map<string, RemoteVirtualDiskClass>,

    getAllLocal(): Map<string, LocalVirtualDiskClass>,

    addRemote(vd: VirtualDiskData): void,

    addLocal(vd: LocalVirtualDiskConfig): void,

    removeLocal(vdID: string): void,

    removeRemote(vdID: string): void,

    editLocalConfig(vdID: string, editObject: Partial<LocalVirtualDiskConfig>): void,

    editRemoteConfig(vdID: string, editObject: Partial<RemoteVirtualDiskConfig>): void,
}

export type $VirtualDisksStore = {virtualDiskStore: IVirtualDisksStore}