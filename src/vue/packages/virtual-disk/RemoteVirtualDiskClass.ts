import type {RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";
import {ref} from "vue";

export class RemoteVirtualDiskClass extends VirtualDiskClass<RemoteVirtualDiskConfig>{
    readonly isRemoteReady = ref(false);
    readonly isRemoteConnected = ref(false);

    constructor(config: RemoteVirtualDiskConfig) {
        super(config);
    }

    async check(): Promise<void> {
        // TODO: Add FileSystem check
        this.isChecking.value = true;

        await (new Promise<void>(resolve => setTimeout(resolve, 1000)))

        this.isCheckSuccess.value = true;
        this.isChecking.value = false;
        this.getRemoteFileSystemInfo();
    }

    setRemoteReady(isReady: boolean): void {
        // TODO: Add actions
        this.isRemoteReady.value = isReady;
        this.getRemoteFileSystemInfo();
    }

    setRemoteConnected(isConnected: boolean): void {
        // TODO: Add actions (get dile system info and other)
        this.isRemoteConnected.value = isConnected;
        this.getRemoteFileSystemInfo();
    }

    getRemoteFileSystemInfo() {
        if(!this.isRemoteConnected.value || !this.isCheckSuccess.value || !this.isRemoteReady.value) return;
        // TODO: Do dome things with WebRTC, set configs
    }
}