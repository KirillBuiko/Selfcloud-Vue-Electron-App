import type {VirtualDiskConfig} from "@/types/VirtualDisksTypes";
import type {Ref} from "vue";
import type {IVirtualDisk} from "@/packages/socket/interfaces/IVirtualDisk";

export abstract class VirtualDiskClass<A extends VirtualDiskConfig> implements IVirtualDisk<A>{
    webrtc = undefined;

    protected constructor(private config: Ref<A>) {
        // TODO
    }

    getConfig(): A {
        return this.config.value
    }
}