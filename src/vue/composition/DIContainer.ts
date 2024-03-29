import type {$WebRTCStore} from "@/packages/webrtc/interfaces/IWebRTCStore";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {$VirtualDisksStore} from "@/packages/virtual-disk/interfaces/IVirtualDisksStore";
import type {$OverlayStore} from "@/stores/OverlayStore";
import type {$NotificationStore} from "@/stores/notificationsStore";
import type {$ConfigStore} from "@/stores/configStore";
import type {$SocketStore} from "@/packages/socket/SoketStore";
import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {$SocketListenersHandlers} from "@/packages/socket/SocketListenersHandlers";
import type {$AuthStore} from "@/packages/request/IAuthStore";
import type {$AccountRequestActions} from "@/packages/request/AccountRequestClass";
import type {$RequestHandler} from "@/packages/request/IRequestHandler";
import type {$UserInfoRequestActions} from "@/packages/request/UserInfoRequestClass";
import type {$WorkerOverlay} from "@/component-class/WorkerOverlay";
import type {$WorkerOverlayWindowLogin} from "@/component-class/WorkerOverlayWindowLogin";
import type {$WorkerOverlayWindowRegistration} from "@/component-class/WorkerOverlayWindowRegistration";
import type {$WorkerViewStart} from "@/component-class/WorkerViewStart";
import type {$WebRTCListenersHandlersToLocal} from "@/packages/webrtc/WebRTCListenersHandlersToLocal";
import type {$WebRTCListenersHandlersToRemote} from "@/packages/webrtc/WebRTCListenersHandlersToRemote";

type StoresType = $OverlayStore & $NotificationStore & $WebRTCStore & $VirtualDisksStore & $ConfigStore & $AuthStore &
    $SocketStore;

type ActionsType = $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions & $SocketListenersHandlers &
    $WorkerOverlay & $WorkerOverlayWindowLogin & $WorkerOverlayWindowRegistration & $WorkerViewStart &
    $WebRTCListenersHandlersToLocal & $WebRTCListenersHandlersToRemote;

type RequestsType = $AccountRequestActions & $RequestHandler & $UserInfoRequestActions;

export type DIContainerType = StoresType & ActionsType & RequestsType;

// eslint-disable-next-line no-var
export var container = {} as DIContainerType;
