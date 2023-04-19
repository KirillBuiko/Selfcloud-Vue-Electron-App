export interface VirtualDiskData{
    vdID: string,
    socketID: string
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

export interface LocalVirtualDiskConfig extends VirtualDiskConfig{
}

export interface RemoteVirtualDiskConfig extends VirtualDiskConfig, VirtualDiskData{
}