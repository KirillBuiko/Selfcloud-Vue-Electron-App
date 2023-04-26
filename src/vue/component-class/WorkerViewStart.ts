import type {$OverlayStore} from "@/stores/OverlayStore";

export class WorkerViewStart {
    constructor(private deps: $OverlayStore) {
    }

    public openLoginOverlay() {
        this.deps.overlayStore.setOverlayName('login');
        this.deps.overlayStore.openOverlay();
    }

    openRegistrationOverlay() {
        this.deps.overlayStore.setOverlayName('registration');
        this.deps.overlayStore.openOverlay();
    }
}

export type $WorkerViewStart = { workerViewStart: WorkerViewStart }
