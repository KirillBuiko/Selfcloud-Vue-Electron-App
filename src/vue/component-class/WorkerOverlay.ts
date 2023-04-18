import type {$OverlayStore} from "@/stores/overlayStore";

export class WorkerOverlay {
    constructor(private S: $OverlayStore) {
    }

    closeOverlay() {
        this.S.overlayStore.closeOverlay();
    }

    changeOverlay(name: string) {
        //TODO
    }

    startLoading() {
        this.S.overlayStore.startLoading();
    }

    stopLoading() {
        this.S.overlayStore.stopLoading();
    }
}

export type $WorkerOverlay = {workerOverlay: WorkerOverlay}
