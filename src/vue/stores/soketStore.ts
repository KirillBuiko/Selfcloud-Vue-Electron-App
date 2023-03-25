import {defineStore} from "pinia";
import {io} from "socket.io-client";
import type {SCSocket} from "@/types/SocketTypes";
import {ref} from "vue";
import {SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";

export const useSocketStore = defineStore('counter', () => {
    const socket = ref<SCSocket>();
    socket.value = io("https://socket.self-cloud.ru", {autoConnect: false});
    const handlers = new SocketListenersHandlers(socket.value);

    socket.value.on("connect", handlers.onConnected.bind(handlers));
    socket.value.on("disconnect", handlers.onDisconnected.bind(handlers));

    socket.value.on("device-disconnected", handlers.onDeviceDisconnected.bind(handlers));
    socket.value.on("device-connected", handlers.onDeviceConnected.bind(handlers));

    socket.value.on("provide-virtual-disks", handlers.onProvideVirtualDisks.bind(handlers));
    socket.value.on("revoke-virtual-disk", handlers.onRevokeVirtualDisk.bind(handlers));

    socket.value.on("create-virtual-disk", handlers.onCreateVirtualDisk.bind(handlers));
    socket.value.on("remove-virtual-disk", handlers.onRemoveVirtualDisk.bind(handlers));

    socket.value.on("webrtc-offer-received", handlers.onWebRTCOfferReceived.bind(handlers));
    socket.value.on("webrtc-answer-received", handlers.onWebRTCAnswerReceived.bind(handlers));
    socket.value.on("webrtc-candidate-received", handlers.onWebRTCCandidateReceived.bind(handlers));

    socket.value.connect();
    return {socket}
})
