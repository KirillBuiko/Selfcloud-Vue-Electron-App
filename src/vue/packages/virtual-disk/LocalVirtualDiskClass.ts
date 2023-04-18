import type {LocalVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";
import type {Ref} from "vue";

export class LocalVirtualDiskClass extends VirtualDiskClass<LocalVirtualDiskConfig>{
    constructor(config: Ref<LocalVirtualDiskConfig>) {
        super(config);
    }

    check(): boolean{
        // TODO
        return true;
    }
}