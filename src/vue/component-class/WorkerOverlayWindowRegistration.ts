import {WorkerOverlay} from "@/component-class/WorkerOverlay";
import type {RegData} from "@/types/Objects";
import {WorkerViewStart} from "@/component-class/WorkerViewStart";
import type {$OverlayStore} from "@/stores/overlayStore";

export class WorkerOverlayWindowRegistration extends WorkerOverlay{
    constructor(servs: $OverlayStore) {
        super(servs);
    }

    registration(data: RegData){
        //TODO
    }
}

export type $WorkerOverlayWindowRegistration = {workerOverlayWindowRegistration: WorkerOverlayWindowRegistration}
