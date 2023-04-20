import {io} from "socket.io-client";
import type {SCSocket} from "@/types/SocketTypes";
import type {$SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";

export class SocketStore {
    public socket: SCSocket;

    constructor(deps: $SocketListenersHandlers) {
        this.socket = io("https://socket.self-cloud.ru", {autoConnect: false});
        deps.socketListenersHandlers.initSocketListeners(this.socket);
    }

    connect() {
        this.socket.connect();
    }
}

export type $SocketStore = {socketStore: SocketStore}
