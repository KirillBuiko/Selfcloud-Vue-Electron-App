import type {$OverlayStore} from "@/stores/OverlayStore";

export class WorkerOverlay {
    constructor(private deps: $OverlayStore) {
    }

    closeOverlay() {
        this.deps.overlayStore.closeOverlay();
    }

    changeOverlay(name: string) {
        //TODO
    }

    startLoading() {
        this.deps.overlayStore.startLoading();
    }

    stopLoading() {
        this.deps.overlayStore.stopLoading();
    }
}

export type $WorkerOverlay = {workerOverlay: WorkerOverlay}
