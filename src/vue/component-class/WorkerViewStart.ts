import type {$OverlayStore} from "@/stores/overlayStore";

export class WorkerViewStart {
    constructor(private S: $OverlayStore) {
    }

    public openLoginOverlay(){
        this.S.overlayStore.setOverlayName('login');
        this.S.overlayStore.openOverlay();
    }

    openRegistrationOverlay(){
        this.S.overlayStore.setOverlayName('registration');
        this.S.overlayStore.openOverlay();
    }
}

export type $WorkerViewStart = {workerViewStart: WorkerViewStart}
