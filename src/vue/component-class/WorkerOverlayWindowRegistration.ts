import {WorkerOverlay} from "@/component-class/WorkerOverlay";
import type {RegData} from "@/types/Objects";
import type {$OverlayStore} from "@/stores/OverlayStore";
import type {$AccountRequestActions} from "@/packages/request/AccountRequestClass";
import type {$NotificationStore} from "@/stores/notificationsStore";
import {ResultCode} from "@/types/ResultCode";
import {ResultDescription} from "@/types/ResultDescription";

export class WorkerOverlayWindowRegistration extends WorkerOverlay {
    constructor(private deps: $OverlayStore & $AccountRequestActions & $NotificationStore) {
        super(deps);
    }

    async registration(data: RegData){
        // TODO: add data validation
        this.startLoading();
        try {
            const response = await this.deps.accountRequestActions.registration(data);
            if(response.code === ResultCode.OK)
                this.deps.notificationStore.addSuccessNotification(["Успех", "Вы зарегестрированы"]);
            else
                this.deps.notificationStore.addErrorNotification(ResultDescription[response.code]);
        }
        catch(e){
            this.deps.notificationStore.addErrorNotification(ResultDescription[ResultCode.FAIL]);
        }
        this.stopLoading();
    }
}

export type $WorkerOverlayWindowRegistration = { workerOverlayWindowRegistration: WorkerOverlayWindowRegistration }
