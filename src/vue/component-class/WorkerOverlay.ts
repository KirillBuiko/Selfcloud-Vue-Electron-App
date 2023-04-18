import type {$OverlayStore} from "@/stores/overlayStore";

export class WorkerOverlay {
    constructor(private servs: $OverlayStore) {
    }

    closeOverlay() {
        this.servs.overlayStore.closeOverlay();
    }

    changeOverlay(name: string) {
        //TODO
    }

    startLoading() {
        this.servs.overlayStore.startLoading();
    }

    stopLoading() {
        this.servs.overlayStore.stopLoading();
    }
}

export type $WorkerOverlay = {workerOverlay: WorkerOverlay}
