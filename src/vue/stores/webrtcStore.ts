import {defineStore} from "pinia";
import {ref} from "vue";

export const useWebRTCStore = defineStore('webrtc', () => {
    // TODO: set webrtcconnection type, make getters and setters
    const webrtcConnectionsFrom = ref(new Map<[fingerprint: string, socketID: string], any>());
    const webrtcConnectionsTo = ref(new Map<string, any>());
    return {webrtcConnectionsFrom, webrtcConnectionsTo}
})
