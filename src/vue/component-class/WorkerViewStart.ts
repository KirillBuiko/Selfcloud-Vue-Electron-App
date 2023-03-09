import {useOverlayStateStore} from "@/stores/overlayStore";

export class WorkerViewStart {
    overlayState;

    constructor() {
        this.overlayState = useOverlayStateStore();
    }

    public openLoginOverlay(){
        this.overlayState.setOverlayName('login');
        this.overlayState.openOverlay();
    }

    openRegistrationOverlay(){
        this.overlayState.setOverlayName('registration');
        this.overlayState.openOverlay();
    }
}
