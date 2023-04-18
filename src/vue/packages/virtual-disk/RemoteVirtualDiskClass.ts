import type {RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";
import type {Ref} from "vue";

export class RemoteVirtualDiskClass extends VirtualDiskClass<RemoteVirtualDiskConfig>{
    constructor(config: Ref<RemoteVirtualDiskConfig>) {
        super(config);
    }

    check(): boolean {
        // TODO
        return true;
    }

    setOnline(socketID: string, fingerprint: string): void {
        //TODO
    }

    setOffline(): void {
        // TODO
    }
}