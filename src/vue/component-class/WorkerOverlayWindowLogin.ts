import {WorkerOverlay} from "@/component-class/WorkerOverlay";
import type {LoginData} from "@/types/Objects";
import type {$OverlayStore} from "@/stores/OverlayStore";
import type {$AccountRequestActions} from "@/packages/request/AccountRequestClass";
import type {$NotificationStore} from "@/stores/notificationsStore";
import {ResultCode} from "@/types/ResultCode";
import {ResultDescription} from "@/types/ResultDescription";

export class WorkerOverlayWindowLogin extends WorkerOverlay {
    constructor(private deps: $OverlayStore & $AccountRequestActions & $NotificationStore) {
        super(deps);
    }

    async login(data: LoginData) {
        // TODO: add data validation
        try {
            const response = await this.deps.accountRequestActions.loginPassword(data);
            if(response.code === ResultCode.OK)
                return true;
            else
                this.deps.notificationStore.addErrorNotification(ResultDescription[response.code]);
        }
        catch(e){
            this.deps.notificationStore.addErrorNotification(ResultDescription[ResultCode.FAIL]);
        }
        return false;
    }
}

export type $WorkerOverlayWindowLogin = { workerOverlayWindowLogin: WorkerOverlayWindowLogin }
