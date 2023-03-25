import type {VirtualDiskConfig} from "@/types/VirtualDisksTypes";

export interface IVirtualDisk<A extends VirtualDiskConfig>{
    check?(): boolean;
    getConfig(): A;
}