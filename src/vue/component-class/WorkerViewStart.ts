import type {$OverlayStore} from "@/stores/overlayStore";

export class WorkerViewStart {
    constructor(private D: $OverlayStore) {
    }

    public openLoginOverlay(){
        this.D.overlayStore.setOverlayName('login');
        this.D.overlayStore.openOverlay();
    }

    openRegistrationOverlay(){
        this.D.overlayStore.setOverlayName('registration');
        this.D.overlayStore.openOverlay();
    }
}

export type $WorkerViewStart = {workerViewStart: WorkerViewStart}
