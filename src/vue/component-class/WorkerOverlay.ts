import type {$OverlayStore} from "@/stores/OverlayStore";

export class WorkerOverlay {
    constructor(private baseDeps: $OverlayStore) {
    }

    closeOverlay() {
        this.baseDeps.overlayStore.closeOverlay();
    }

    changeOverlay(name: string) {
        //TODO
    }

    startLoading() {
        this.baseDeps.overlayStore.startLoading();
    }

    stopLoading() {
        this.baseDeps.overlayStore.stopLoading();
    }
}

export type $WorkerOverlay = { workerOverlay: WorkerOverlay }
