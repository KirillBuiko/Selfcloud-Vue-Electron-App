import type {$WebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStoreActions";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDiskStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStoreActions";
import type {$OverlayStore} from "@/stores/overlayStore";
import type {$NotificationStore} from "@/stores/notificationsStore";
import type {$ConfigStore} from "@/stores/configStore";
import type {$Socket} from "@/stores/soketStore";
import {useOverlayStateStore} from "@/stores/overlayStore";
import {useConfigStore} from "@/stores/configStore";
import {useNotificationsStore} from "@/stores/notificationsStore";
import {useSocketStore} from "@/stores/soketStore";
import {useVirtualDiskStore} from "@/stores/virtualDiskStore";
import {useWebRTCStore} from "@/stores/webrtcStore";
import {useAuthStore} from "@/stores/authStore";
import {WebRTCWorkerActions} from "@/packages/webrtc/WebRTCWorkerActions";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import {VirtualDiskWorkerActions} from "@/packages/virtual-disk/VirtualDiskWorkerActions";
import {type $SocketEmitActions, SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {SCSocket} from "@/types/SocketTypes";
import type {$SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";
import {SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";
import type {$AuthStore} from "@/packages/request/IAuthStorage";
import type {$AccountRequestActions} from "@/packages/request/AccountRequestClass";
import type {$RequestHandler} from "@/packages/request/IRequestHandler";
import type {$UserInfoRequestActions} from "@/packages/request/UserInfoRequestClass";
import RequestHandlerClass from "@/packages/request/RequestHandlerClass";
import AccountRequestClass from "@/packages/request/AccountRequestClass";
import UserInfoRequestClass from "@/packages/request/UserInfoRequestClass";
import type {$WorkerOverlay} from "@/component-class/WorkerOverlay";
import type {$WorkerOverlayWindowLogin} from "@/component-class/WorkerOverlayWindowLogin";
import type {$WorkerOverlayWindowRegistration} from "@/component-class/WorkerOverlayWindowRegistration";
import type {$WorkerViewStart} from "@/component-class/WorkerViewStart";
import {WorkerOverlay} from "@/component-class/WorkerOverlay";
import {WorkerOverlayWindowLogin} from "@/component-class/WorkerOverlayWindowLogin";
import {WorkerViewStart} from "@/component-class/WorkerViewStart";

console.log("di start")

type StoresType = $OverlayStore & $NotificationStore & $WebRTCStore & $VirtualDiskStore & $ConfigStore & $AuthStore &
    $Socket;

type ActionsType = $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions & $SocketListenersHandlers&
    $WorkerOverlay & $WorkerOverlayWindowLogin & $WorkerOverlayWindowRegistration & $WorkerViewStart;
type RequestType = $AccountRequestActions & $RequestHandler & $UserInfoRequestActions;

// eslint-disable-next-line no-var
export var container: StoresType & ActionsType & RequestType = {} as any;

export const containerInit = () => {
    container.configStore = useConfigStore();
    container.overlayStore = useOverlayStateStore();
    container.notificationStore = useNotificationsStore();
    container.virtualDiskStore = useVirtualDiskStore();
    container.webrtcStore = useWebRTCStore();
    container.authStore = useAuthStore()

    container.webrtcWorkerActions = new WebRTCWorkerActions(container as
        $WebRTCStore & $SocketEmitActions);
    container.socketEmitActions = new SocketEmitActions(container as
        $WebRTCWorkerActions & $Socket);
    container.virtualDiskWorkerActions = new VirtualDiskWorkerActions(container as
        $WebRTCWorkerActions & $VirtualDiskStore & $SocketEmitActions);
    container.socketListenersHandlers = new SocketListenersHandlers(container as
        $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions);

    container.socket = useSocketStore(container as $SocketListenersHandlers).socket as SCSocket;

    container.requestHandler = new RequestHandlerClass(container as $AuthStore);
    container.accountRequestActions = new AccountRequestClass(container as $RequestHandler);
    container.userInfoRequestActions = new UserInfoRequestClass(container as $RequestHandler);

    container.workerOverlay = new WorkerOverlay(container as $OverlayStore);
    container.workerOverlayWindowLogin = new WorkerOverlayWindowLogin(container as $OverlayStore);
    container.workerViewStart = new WorkerViewStart(container as $OverlayStore);
    container.workerOverlayWindowLogin = new WorkerOverlayWindowLogin(container as $OverlayStore);
}
