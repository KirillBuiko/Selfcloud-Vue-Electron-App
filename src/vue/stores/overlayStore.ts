import { defineStore } from 'pinia'

export const useOverlayStateStore = defineStore('overlayState', {
    state: () => ({
        overlayName: "login",
        isOpen: false,
        isLoading: false,
        effect: "",
        effectOptions: {}
    }),
    getters: {
    },
    actions: {
        setOverlayName(name: string) {
            this.overlayName = name;
        },
        openOverlay(){
            this.isOpen = true;
        },
        closeOverlay(){
            if(!this.isLoading)
                this.isOpen = false;
        },
        startLoading(){
            if(this.isOpen)
                this.isLoading = true;
        },
        stopLoading(){
            this.isLoading = false;
        }
    }
})
