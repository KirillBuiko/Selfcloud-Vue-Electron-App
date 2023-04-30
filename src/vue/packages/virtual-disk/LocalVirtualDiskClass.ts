import type {LocalVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export class LocalVirtualDiskClass extends VirtualDiskClass<LocalVirtualDiskConfig> {
    constructor(deps: $SocketEmitActions, config: LocalVirtualDiskConfig) {
        super(deps, config);
    }

    async check(): Promise<void> {
        // TODO: Add FileSystem check, if check successful - provide
        this.states.isChecking = true;
        this.states.checkStatus = false;

        await (new Promise<void>(resolve => setTimeout(resolve, 300)))

        this.deps.socketEmitActions.provideVirtualDisks([this.getConfig().vdID])
        this.states.isChecking = false;
        this.states.checkStatus = true;
    }
}

export type $LocalVirtualDiskClass = {localVirtualDiskClass: (config: LocalVirtualDiskConfig)=>LocalVirtualDiskClass}
