import type {$OverlayStore} from "@/stores/overlayStore";

export class WorkerViewStart {
    constructor(private servs: $OverlayStore) {
    }

    public openLoginOverlay(){
        this.servs.overlayStore.setOverlayName('login');
        this.servs.overlayStore.openOverlay();
    }

    openRegistrationOverlay(){
        this.servs.overlayStore.setOverlayName('registration');
        this.servs.overlayStore.openOverlay();
    }
}

export type $WorkerViewStart = {workerViewStart: WorkerViewStart}
