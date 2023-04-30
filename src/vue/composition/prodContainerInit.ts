import type {$WebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import type {$OverlayStore} from "@/stores/OverlayStore";
import {OverlayStore} from "@/stores/OverlayStore";
import type {$SocketStore} from "@/stores/SoketStore";
import {SocketStore} from "@/stores/SoketStore";
import {useConfigStore} from "@/stores/configStore";
import {useNotificationsStore} from "@/stores/notificationsStore";
import {WebRTCStore} from "@/stores/WebRTCStore";
import {WebRTCWorkerActions} from "@/packages/webrtc/WebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import {VirtualDiskWorkerActions} from "@/packages/virtual-disk/VirtualDiskWorkerActions";
import {type $SocketEmitActions, SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {$SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";
import {SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";
import type {$AuthStore} from "@/packages/request/IAuthStorage";
import type {$RequestHandler} from "@/packages/request/IRequestHandler";
import RequestHandlerClass from "@/packages/request/RequestHandlerClass";
import AccountRequestClass, {type $AccountRequestActions} from "@/packages/request/AccountRequestClass";
import UserInfoRequestClass from "@/packages/request/UserInfoRequestClass";
import {WorkerOverlay} from "@/component-class/WorkerOverlay";
import {WorkerOverlayWindowLogin} from "@/component-class/WorkerOverlayWindowLogin";
import {WorkerViewStart} from "@/component-class/WorkerViewStart";
import {WorkerOverlayWindowRegistration} from "@/component-class/WorkerOverlayWindowRegistration";
import type {DIContainerType} from "@/composition/DIContainer";
import {container} from "@/composition/DIContainer";
import {AuthStore} from "@/stores/AuthStore";
import {VirtualDisksStore} from "@/stores/VirtualDisksStore";
import {
    type $WebRTCListenersHandlersToLocal,
    WebRTCListenersHandlersToLocal
} from "@/packages/webrtc/WebRTCListenersHandlersToLocal";
import {
    type $WebRTCListenersHandlersToRemote,
    WebRTCListenersHandlersToRemote
} from "@/packages/webrtc/WebRTCListenersHandlersToRemote";

export const prodContainerInit = () => {
    const _: DIContainerType = {
        configStore: container.configStore = useConfigStore(),
        overlayStore: container.overlayStore = new OverlayStore(),
        notificationStore: container.notificationStore = useNotificationsStore(),
        authStore: container.authStore = new AuthStore(),

        requestHandler: container.requestHandler =
            new RequestHandlerClass(container as
                $AuthStore),
        accountRequestActions: container.accountRequestActions =
            new AccountRequestClass(container as
                $RequestHandler),
        userInfoRequestActions: container.userInfoRequestActions =
            new UserInfoRequestClass(container as
                $RequestHandler),

        webrtcWorkerActions: container.webrtcWorkerActions =
            new WebRTCWorkerActions(container as
                $WebRTCStore & $SocketEmitActions),
        socketEmitActions: container.socketEmitActions =
            new SocketEmitActions(container as
                $WebRTCWorkerActions & $SocketStore),
        virtualDiskWorkerActions: container.virtualDiskWorkerActions =
            new VirtualDiskWorkerActions(container as
                $WebRTCWorkerActions & $VirtualDisksStore & $SocketEmitActions & $AuthStore),

        webrtcListenersHandlersToLocal: container.webrtcListenersHandlersToLocal =
            new WebRTCListenersHandlersToLocal(container as
                $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions),
        webrtcListenersHandlersToRemote: container.webrtcListenersHandlersToRemote =
            new WebRTCListenersHandlersToRemote(container as
                $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions),
        webrtcStore: container.webrtcStore =
            new WebRTCStore(container as $WebRTCListenersHandlersToRemote & $WebRTCListenersHandlersToLocal),

        socketListenersHandlers: container.socketListenersHandlers =
            new SocketListenersHandlers(container as
                $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions & $AccountRequestActions),
        socketStore: container.socketStore =
            new SocketStore(container as
                $SocketListenersHandlers),

        virtualDiskStore: container.virtualDiskStore =
            new VirtualDisksStore(container as
                $SocketEmitActions),

        workerOverlay: container.workerOverlay =
            new WorkerOverlay(container as
                $OverlayStore),
        workerOverlayWindowLogin: container.workerOverlayWindowLogin =
            new WorkerOverlayWindowLogin(container as
                $OverlayStore),
        workerViewStart: container.workerViewStart =
            new WorkerViewStart(container as
                $OverlayStore),
        workerOverlayWindowRegistration: container.workerOverlayWindowRegistration =
            new WorkerOverlayWindowRegistration(container as
                $OverlayStore),
    }
}