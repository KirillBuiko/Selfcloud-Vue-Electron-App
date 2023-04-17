import type {$OverlayStore} from "@/stores/overlayStore";

export class WorkerOverlay {
    constructor(private D: $OverlayStore) {
    }

    closeOverlay() {
        this.D.overlayStore.closeOverlay();
    }

    changeOverlay(name: string) {
        //TODO
    }

    startLoading() {
        this.D.overlayStore.startLoading();
    }

    stopLoading() {
        this.D.overlayStore.stopLoading();
    }
}

export type $WorkerOverlay = {workerOverlay: WorkerOverlay}
