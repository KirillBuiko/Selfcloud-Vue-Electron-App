import type {$WebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import type {$OverlayStore} from "@/stores/OverlayStore";
import type {$Socket} from "@/stores/SoketStore";
import {OverlayStore} from "@/stores/OverlayStore";
import {useConfigStore} from "@/stores/configStore";
import {useNotificationsStore} from "@/stores/notificationsStore";
import {useSocketStore} from "@/stores/SoketStore";
import {WebRTCStore} from "@/stores/WebRTCStore";
import {WebRTCWorkerActions} from "@/packages/webrtc/WebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import {VirtualDiskWorkerActions} from "@/packages/virtual-disk/VirtualDiskWorkerActions";
import {type $SocketEmitActions, SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {SCSocket} from "@/types/SocketTypes";
import type {$SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";
import {SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";
import type {$AuthStore} from "@/packages/request/IAuthStorage";
import type {$RequestHandler} from "@/packages/request/IRequestHandler";
import RequestHandlerClass from "@/packages/request/RequestHandlerClass";
import AccountRequestClass from "@/packages/request/AccountRequestClass";
import UserInfoRequestClass from "@/packages/request/UserInfoRequestClass";
import {WorkerOverlay} from "@/component-class/WorkerOverlay";
import {WorkerOverlayWindowLogin} from "@/component-class/WorkerOverlayWindowLogin";
import {WorkerViewStart} from "@/component-class/WorkerViewStart";
import {WorkerOverlayWindowRegistration} from "@/component-class/WorkerOverlayWindowRegistration";
import type {DIContainerType} from "@/composition/DIContainer";
import {container} from "@/composition/DIContainer";
import {AuthStore} from "@/stores/AuthStore";
import {VirtualDiskStore} from "@/stores/VirtualDiskStore";

export const prodContainerInit = () => {
    const _: DIContainerType = {
        configStore: container.configStore = useConfigStore(),
        overlayStore: container.overlayStore = new OverlayStore(),
        notificationStore: container.notificationStore = useNotificationsStore(),
        virtualDiskStore: container.virtualDiskStore = new VirtualDiskStore(),
        webrtcStore: container.webrtcStore = new WebRTCStore(),
        authStore: container.authStore = new AuthStore(),

        webrtcWorkerActions: container.webrtcWorkerActions =
            new WebRTCWorkerActions(container as
                $WebRTCStore & $SocketEmitActions),
        socketEmitActions: container.socketEmitActions =
            new SocketEmitActions(container as
                $WebRTCWorkerActions & $Socket),
        virtualDiskWorkerActions: container.virtualDiskWorkerActions =
            new VirtualDiskWorkerActions(container as
                $WebRTCWorkerActions & $VirtualDiskStore & $SocketEmitActions),
        socketListenersHandlers: container.socketListenersHandlers =
            new SocketListenersHandlers(container as
                $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions & $AuthStore),

        socket: container.socket = useSocketStore(container as
            $SocketListenersHandlers).socket as SCSocket,

        requestHandler: container.requestHandler =
            new RequestHandlerClass(container as
                $AuthStore),
        accountRequestActions: container.accountRequestActions =
            new AccountRequestClass(container as
                $RequestHandler),
        userInfoRequestActions: container.userInfoRequestActions =
            new UserInfoRequestClass(container as
                $RequestHandler),

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