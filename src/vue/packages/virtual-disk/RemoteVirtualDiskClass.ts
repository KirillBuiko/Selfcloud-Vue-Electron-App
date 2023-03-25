import type {RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";
import type {Ref} from "vue";
import type {IRemoteVirtualDisk} from "@/packages/socket/interfaces/IRemoteVirtualDisk";

export class RemoteVirtualDiskClass extends VirtualDiskClass<RemoteVirtualDiskConfig> implements IRemoteVirtualDisk{
    constructor(config: Ref<RemoteVirtualDiskConfig>) {
        super(config);
    }

    check(): boolean {
        return false;
    }

    setOnline(socketID: string, fingerprint: string): void {
        //TODO
    }

    setOffline(): void {
        // TODO
    }
}