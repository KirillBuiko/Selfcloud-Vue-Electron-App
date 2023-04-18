import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {LocalVirtualDiskConfig, RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import type {IVirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes";
import {useLocalStorage} from "@vueuse/core";
import {ref} from "vue";

export class VirtualDiskStore implements IVirtualDisksStore{
    remoteVirtualDisksConfig = useLocalStorage<RemoteVirtualDiskConfig[]>("remoteVirtualDisksConfig", []);
    localVirtualDisksConfig = useLocalStorage<LocalVirtualDiskConfig[]>("localVirtualDisksConfig", []);
    remoteVirtualDisks = ref(new Map<string, RemoteVirtualDiskClass>());
    localVirtualDisks = ref(new Map<string, LocalVirtualDiskClass>());

    constructor(){
        // TODO: made VDs init, file system check
    }

    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass | undefined {
        // TODO
        return undefined;
    }
    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined {
        // TODO
        return undefined;
    }
    getAllRemoteVirtualDisks(): RemoteVirtualDiskClass[] {
        // TODO
        return [];
    }
    getAllLocalVirtualDisks(): LocalVirtualDiskClass[] {
        // TODO
        return [];
    }
    addRemoteVirtualDisk(vd: VirtualDiskData): void {
        // TODO
    }
    addLocalVirtualDisk(vd: LocalVirtualDiskConfig): void {
        // TODO
    }
    removeLocalVirtualDisk(vdID: string): void {
        // TODO
    }
    removeRemoteVirtualDisk(vdID: string): void {
        // TODO
    }
}
