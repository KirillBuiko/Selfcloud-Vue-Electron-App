import {WorkerOverlay} from "@/component-class/WorkerOverlay";
import type {RegData} from "@/types/Objects";
import type {$OverlayStore} from "@/stores/OverlayStore";

export class WorkerOverlayWindowRegistration extends WorkerOverlay{
    constructor(deps: $OverlayStore) {
        super(deps);
    }

    registration(data: RegData){
        //TODO
    }
}

export type $WorkerOverlayWindowRegistration = {workerOverlayWindowRegistration: WorkerOverlayWindowRegistration}
