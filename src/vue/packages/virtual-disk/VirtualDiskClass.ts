import type {VirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {ref} from "vue";

export abstract class VirtualDiskClass<A extends VirtualDiskConfig> {
    webrtc = undefined;
    isChecking = ref(false);
    checkError = ref("");
    checkStatus = ref(false);

    protected constructor(private config: A) {
        // TODO
    }

    getConfig(): A {
        return this.config
    }

    setConfig(config: A) {
        this.config = config;
        this.check();
    }

    abstract check(): Promise<void>;
}