import type {RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";
import {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";
import {reactive, ref} from "vue";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";

export class RemoteVirtualDiskClass extends VirtualDiskClass<RemoteVirtualDiskConfig> {
    remoteStates = reactive({
        isRemoteReady: ref(false),
        remoteConnectionStatus: ref(false)
    })

    constructor(deps: $SocketEmitActions, config: RemoteVirtualDiskConfig) {
        super(deps, config);
    }

    async check(): Promise<void> {
        // TODO: Add FileSystem check
        this.states.isChecking = true;
        this.states.checkStatus = false;

        await (new Promise<void>(resolve => setTimeout(resolve, 300)))

        this.states.checkStatus = true;
        this.states.isChecking = false;
        this.getRemoteFileSystemInfo();
    }

    setRemoteReady(isReady: boolean): void {
        // TODO: Add actions
        this.remoteStates.isRemoteReady = isReady;
        this.getRemoteFileSystemInfo();
    }

    setRemoteConnected(isConnected: boolean): void {
        // TODO: Add actions (get file system info and other)
        this.remoteStates.remoteConnectionStatus = isConnected;
        this.getRemoteFileSystemInfo();
    }

    getRemoteFileSystemInfo() {
        if (!this.remoteStates.remoteConnectionStatus || !this.states.checkStatus ||
            !this.remoteStates.isRemoteReady) return;
        // TODO: Do dome things with WebRTC, set configs
    }
}

export type $RemoteVirtualDiskClass = {remoteVirtualDiskClass: (config: RemoteVirtualDiskConfig)=>RemoteVirtualDiskClass};
