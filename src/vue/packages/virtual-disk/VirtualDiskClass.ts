import type {VirtualDiskConfig} from "@/types/VirtualDisksTypes";
import type {Ref} from "vue";

export abstract class VirtualDiskClass<A extends VirtualDiskConfig>{
    webrtc = undefined;

    protected constructor(private config: Ref<A>) {
        // TODO
    }

    getConfig(): A {
        return this.config.value
    }
}