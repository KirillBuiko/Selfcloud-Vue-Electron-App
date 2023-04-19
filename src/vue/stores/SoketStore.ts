import {io} from "socket.io-client";
import type {SCSocket} from "@/types/SocketTypes";
import type {$SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";

export class SocketStore {
    public socket: SCSocket;

    constructor(deps: $SocketListenersHandlers) {
        this.socket = io("https://socket.self-cloud.ru", {autoConnect: false});
        const handlers = deps.socketListenersHandlers;

        this.socket.on("connect", handlers.onConnected.bind(handlers));
        this.socket.on("disconnect", handlers.onDisconnected.bind(handlers));

        this.socket.on("device-disconnected", handlers.onDeviceDisconnected.bind(handlers));
        this.socket.on("device-connected", handlers.onDeviceConnected.bind(handlers));

        this.socket.on("provide-virtual-disks", handlers.onProvideVirtualDisks.bind(handlers));
        this.socket.on("revoke-virtual-disk", handlers.onRevokeVirtualDisk.bind(handlers));

        this.socket.on("create-virtual-disk", handlers.onCreateVirtualDisk.bind(handlers));
        this.socket.on("remove-virtual-disk", handlers.onRemoveVirtualDisk.bind(handlers));

        this.socket.on("webrtc-offer-received", handlers.onWebRTCOfferReceived.bind(handlers));
        this.socket.on("webrtc-answer-received", handlers.onWebRTCAnswerReceived.bind(handlers));
        this.socket.on("webrtc-candidate-received", handlers.onWebRTCCandidateReceived.bind(handlers));
    }

    connect() {
        this.socket.connect();
    }
}

export type $SocketStore = {socketStore: SocketStore}
