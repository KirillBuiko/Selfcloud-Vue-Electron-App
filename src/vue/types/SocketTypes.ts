import type {Socket} from "socket.io-client";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes"

export interface SocketEmitEvents {
    "get-virtual-disks": (callback: (vds: VirtualDiskData[]) => void) => void,
    "provide-virtual-disks": (vdIDs: string[]) => void,
    "revoke-virtual-disk": (vdID: string) => void,
    "create-virtual-disk": (callback: (vd: VirtualDiskData) => void) => void,
    "remove-virtual-disk": (vdID: string) => void,
    "send-webrtc-candidate": (targetID: string, fingerprint: string, candidate: string) => void,
    "connect-webrtc": (targetID: string, fingerprint: string, offer: string) => void,
    "connect-webrtc-answer": (targetID: string, fingerprint: string, answer: string) => void
}

export interface SocketListenEvents {
    "device-disconnected": (fingerprint: string) => void,
    "device-connected": (socketID: string, fingerprint: string) => void,
    "provide-virtual-disks": (socketID: string, fingerprint: string, vdIDs: string[]) => void,
    "revoke-virtual-disk": (fingerprint: string, vdID: string) => void,
    "create-virtual-disk": (vd: VirtualDiskData) => void,
    "remove-virtual-disk": (vdID: string) => void,
    "webrtc-offer-received": (sourceID: string, fingerprint: string, offer: string) => void,
    "webrtc-answer-received": (sourceID: string, fingerprint: string, answer: string) => void,
    "webrtc-candidate-received": (sourceID: string, fingerprint: string, candidate: string) => void
}

export type SCSocket = Socket<SocketListenEvents, SocketEmitEvents>