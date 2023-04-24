import {io} from "socket.io-client";
import {reactive} from "vue";
import type {SCSocket} from "@/types/SocketTypes";
import type {$SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";
import {Configs} from "@/Configs";

export class SocketStore {
    public socket: SCSocket;
    public state = reactive({connected: false});

    constructor(deps: $SocketListenersHandlers) {
        this.socket = io(Configs.SOCKET_URI, {autoConnect: false, withCredentials: true});
        this.socket.on("connect", () => {this.state.connected = true});
        this.socket.on("disconnect", () => {this.state.connected = false});
        deps.socketListenersHandlers.initSocketListeners(this.socket);
    }



    connect() {
        this.socket.connect();
    }

    disconnect() {
        this.socket.disconnect();
    }
}

export type $SocketStore = {socketStore: SocketStore}
