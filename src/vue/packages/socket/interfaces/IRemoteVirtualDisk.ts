import type {IVirtualDisk} from "@/packages/socket/interfaces/IVirtualDisk";
import type {RemoteVirtualDiskConfig} from "@/types/VirtualDisksTypes";

export interface IRemoteVirtualDisk extends IVirtualDisk<RemoteVirtualDiskConfig>{
    setOnline(socketID: string, fingerprint: string): void;
    setOffline(): void;
}