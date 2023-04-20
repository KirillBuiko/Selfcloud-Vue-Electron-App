export interface VirtualDiskData{
    vdID: string,
    fingerprint: string,
    isOnline: boolean,
}

export interface VirtualDiskConfig{
    vdID: string,
    name: string,
    totalSizeBytes: number,
    remainedSizeBytes: number,
    localPath: string
}

export type LocalVirtualDiskConfig = VirtualDiskConfig;

export interface RemoteVirtualDiskConfig extends VirtualDiskConfig, VirtualDiskData{
}