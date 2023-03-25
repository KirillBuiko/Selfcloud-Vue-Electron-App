import type {LocalVirtualDiskConfig, VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import type {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";

export interface IVirtualDiskWorkerActions{
    addRemoteVirtualDisk(vd: VirtualDiskData): void,
    createLocalVirtualDisk(vdConfig: Omit<LocalVirtualDiskConfig, "vdID">): void,
    setRemoteVirtualDisksOnline(socketID: string, fingerprint: string, vdIDs: string[]): void,
    setRemoteVirtualDiskOffline(fingerprint: string, vdID: string): void,
    setRemoteDeviceOffline(fingerprint: string): void,
    attachRemoteVirtualDisk(vdID: string): void,
    provideLocalVirtualDisk(vdID: string): void,
    revokeLocalVirtualDisk(vdID: string): void,
    removeLocalVirtualDisk(vdID: string): void,
    removeRemoteVirtualDisk(vdID: string): void,
    getLocalVirtualDisk(vdID: string): LocalVirtualDiskClass | undefined,
    getRemoteVirtualDisk(vdID: string): RemoteVirtualDiskClass| undefined,
    getAllLocalVirtualDisks(): LocalVirtualDiskClass[],
    getAllRemoteVirtualDisks(): RemoteVirtualDiskClass[],
}