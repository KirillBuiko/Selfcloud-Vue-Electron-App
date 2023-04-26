import type {VirtualDiskClass} from "@/packages/virtual-disk/VirtualDiskClass";

export type VirtualDiskStoreObject = VirtualDiskClass<VirtualDiskConfig>;

export type VirtualDiskConfigStoreObject =
    {
        [ind: string]:
            {
                isRemote: false
                config: VirtualDiskConfig,
            }
    }

export interface VirtualDiskData {
    vdID: string,
    fingerprint: string,
    isOnline: boolean,
}

export interface VirtualDiskConfig {
    vdID: string,
    name: string,
    totalSizeBytes: number,
    remainedSizeBytes: number,
    localPath: string
}

export type LocalVirtualDiskConfig = VirtualDiskConfig;

export interface RemoteVirtualDiskConfig extends VirtualDiskConfig, VirtualDiskData {
}