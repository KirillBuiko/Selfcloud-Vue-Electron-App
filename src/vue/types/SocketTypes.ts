import type {Socket} from "socket.io-client";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes"

interface SocketEmitEvents{
    "get-virtual-disks": (callback: (vds: VirtualDiskData[]) => void) => void,
    "provide-virtual-disks": (vdIDs: string[]) => void,
    "revoke-virtual-disk": (vdID: string) => void,
    "create-virtual-disk": (callback: (vd: VirtualDiskData) => void) => void,
    "remove-virtual-disk": (vdID: string) => void,
    "to-local-ice-candidate-ready": (fingerprint: string, candidate: string) => void,
    "to-remote-ice-candidate-ready": (fingerprint: string, candidate: string) => void
    "connect-webrtc": (fingerprint: string, offer: string) => void,
    "connect-webrtc-answer": (fingerprint: string, answer: string) => void
}

interface SocketListenEvents{
    "device-disconnected": (fingerprint: string) => void,
    "device-connected": (fingerprint: string) => void,
    "provide-virtual-disks": (fingerprint: string, vdIDs: string[]) => void,
    "revoke-virtual-disk": (fingerprint: string, vdID: string) => void,
    "create-virtual-disk": (vd: VirtualDiskData) => void,
    "remove-virtual-disk": (vdID: string) => void,
    "webrtc-offer-received": (fingerprint: string, offer: string) => void,
    "webrtc-answer-received": (fingerprint: string, answer: string) => void,
    "to-local-ice-candidate-received": (fingerprint: string, candidate: string) => void,
    "to-remote-ice-candidate-received": (fingerprint: string, candidate: string) => void
}

export type SCSocket = Socket<SocketListenEvents, SocketEmitEvents>