import type {VirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {reactive} from "vue";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export abstract class VirtualDiskClass<A extends VirtualDiskConfig> {
    states = reactive({
        isChecking: false,
        checkError: "",
        checkStatus: false
    })

    protected constructor(protected deps: $SocketEmitActions, private config: A) {
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