import {WorkerOverlay} from "@/component-class/WorkerOverlay";
import type {LoginData} from "@/types/Objects";
import type {$OverlayStore} from "@/stores/OverlayStore";

export class WorkerOverlayWindowLogin extends WorkerOverlay{
    constructor(deps: $OverlayStore) {
        super(deps);
    }

    async login(data?: LoginData){
        // TODO: add accountRequest, make 'data' necessary
        this.startLoading();
        await (()=>{return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        })})()
        this.stopLoading();
    }
}

export type $WorkerOverlayWindowLogin = {workerOverlayWindowLogin: WorkerOverlayWindowLogin}
