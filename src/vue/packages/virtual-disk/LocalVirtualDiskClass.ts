import type {LocalVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";

export class LocalVirtualDiskClass extends VirtualDiskClass<LocalVirtualDiskConfig> {
    constructor(config: LocalVirtualDiskConfig) {
        super(config);
    }

    async check(): Promise<void> {
        // TODO: Add FileSystem check, if check successful - provide
        this.isChecking.value = true;

        await (new Promise<void>(resolve => setTimeout(resolve, 1000)))

        this.checkStatus.value = true;
        this.isChecking.value = false;
    }
}