import type {RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";
import {ref} from "vue";

export class RemoteVirtualDiskClass extends VirtualDiskClass<RemoteVirtualDiskConfig> {
    readonly isRemoteReady = ref(false);
    readonly remoteConnectionStatus = ref(false);

    constructor(config: RemoteVirtualDiskConfig) {
        super(config);
    }

    async check(): Promise<void> {
        // TODO: Add FileSystem check
        this.isChecking.value = true;

        await (new Promise<void>(resolve => setTimeout(resolve, 1000)))

        this.checkStatus.value = true;
        this.isChecking.value = false;
        this.getRemoteFileSystemInfo();
    }

    setRemoteReady(isReady: boolean): void {
        // TODO: Add actions
        this.isRemoteReady.value = isReady;
        this.getRemoteFileSystemInfo();
    }

    setRemoteConnected(isConnected: boolean): void {
        // TODO: Add actions (get file system info and other)
        this.remoteConnectionStatus.value = isConnected;
        this.getRemoteFileSystemInfo();
    }

    getRemoteFileSystemInfo() {
        if (!this.remoteConnectionStatus.value || !this.checkStatus.value || !this.isRemoteReady.value) return;
        // TODO: Do dome things with WebRTC, set configs
    }
}