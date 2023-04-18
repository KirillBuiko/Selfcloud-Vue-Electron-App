import {ref} from "vue";

export class OverlayStore {
    overlayName = ref("login");
    isOpen = ref(false);
    isLoading = ref(false);
    effect = ref("");
    effectOptions = ref({});

    setOverlayName(name: string) {
        this.overlayName.value = name;
    }
    openOverlay(){
        this.isOpen.value = true;
    }
    closeOverlay(){
        if(!this.isLoading.value)
            this.isOpen.value = false;
    }
    startLoading(){
        if(this.isOpen.value)
            this.isLoading.value = true;
    }
    stopLoading(){
        this.isLoading.value = false;
    }
}

export type $OverlayStore = {overlayStore: OverlayStore}
