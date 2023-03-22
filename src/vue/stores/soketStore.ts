import {defineStore} from "pinia";
import {io} from "socket.io-client";

export const useSocketStore = defineStore('counter', {
    state: () => ({
        socket: io("https://socket.self-cloud.ru")
    }),
    getters: {

    },
    actions: {
    },
})
