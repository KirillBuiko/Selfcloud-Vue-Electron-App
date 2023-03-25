import type {LocalVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";
import type {Ref} from "vue";
import type {ILocalVirtualDisk} from "@/packages/socket/interfaces/ILocalVirtualDisk";

export class LocalVirtualDiskClass extends VirtualDiskClass<LocalVirtualDiskConfig> implements ILocalVirtualDisk{
    constructor(config: Ref<LocalVirtualDiskConfig>) {
        super(config);
    }

    check(): boolean{
        return false;
    }
}