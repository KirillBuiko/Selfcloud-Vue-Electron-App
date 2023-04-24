import type {$VirtualDiskWorkerActions} from "@/packages/socket/interfaces/IVirtualDiskWorkerActions";
import type {$SocketEmitActions} from "@/packages/socket/SocketEmitActions";
import type {VirtualDiskData} from "@/types/VirtualDisksTypes";
import type {$WebRTCWorkerActions} from "@/packages/socket/interfaces/IWebRTCWorkerActions";
import type {SCSocket} from "@/types/SocketTypes";
import type {ResponseData} from "@/types/Objects";
import {ResultCode} from "@/types/ResultCode";
import type {$AccountRequestActions} from "@/packages/request/AccountRequestClass";


export class SocketListenersHandlers {
    socket: SCSocket | undefined;

    constructor(private deps: $WebRTCWorkerActions & $VirtualDiskWorkerActions & $SocketEmitActions &
        $AccountRequestActions) {}

    initSocketListeners(socket: SCSocket) {
        this.socket = socket;

        // TODO: UNCOMMENT!
        // socket.on("connect", this.onConnected.bind(this));
        socket.on("disconnect", this.onDisconnected.bind(this));
        socket.on("connect_error", err =>
            this.onConnectionError(err as Error & { data: ResponseData<string> }));

        socket.on("device-disconnected", this.onDeviceDisconnected.bind(this));
        socket.on("device-connected", this.onDeviceConnected.bind(this));

        socket.on("provide-virtual-disks", this.onProvideVirtualDisks.bind(this));
        socket.on("revoke-virtual-disk", this.onRevokeVirtualDisk.bind(this));

        socket.on("create-virtual-disk", this.onCreateVirtualDisk.bind(this));
        socket.on("remove-virtual-disk", this.onRemoveVirtualDisk.bind(this));

        socket.on("webrtc-offer-received", this.onWebRTCOfferReceived.bind(this));
        socket.on("webrtc-answer-received", this.onWebRTCAnswerReceived.bind(this));
        socket.on("to-local-ice-candidate-received", this.onToLocalIceCandidateReceived.bind(this));
        socket.on("to-remote-ice-candidate-received", this.onToRemoteIceCandidateReceived.bind(this));
    }

    /**
     * Get virtual disks from socket, set online to them,
     * provide all ready local virtual disks
     * */
    onConnected() {
        // TODO check
        this.deps.socketEmitActions.getVirtualDisks().then((vds: VirtualDiskData[]) =>
            this.deps.virtualDiskWorkerActions.syncVirtualDisks(vds)
        ).catch(() => {
            // TODO: Exception handle
        });
        const readyList: string[] = [];
        this.deps.virtualDiskWorkerActions.getAllLocalVirtualDisks().forEach((vd) => {
            if (vd.checkStatus)
                readyList.push(vd.getConfig().vdID);
        });
        this.deps.socketEmitActions.provideVirtualDisks(readyList);
    }

    onDisconnected() {
        // TODO check
    }

    async onConnectionError(err: Error & { data: ResponseData<string> }) {
        if (!err || !err.data) return;
        console.warn("SOCKET ERROR: ", err.data);
        if (err.data.code === ResultCode.TOKEN_EXPIRED) {
            await this.deps.accountRequestActions.loginToken();
            this.socket?.connect();
        }
    }

    /**
     * Set offline to all this device's vd
     * */
    onDeviceDisconnected(fingerprint: string) {
        // TODO check
        this.deps.virtualDiskWorkerActions.setRemoteDeviceOffline(fingerprint);
    }

    /**
     * Nothing*/
    onDeviceConnected(fingerprint: string) {
        //
    }

    /**
     * Set online to all provided virtual disks
     * */
    onProvideVirtualDisks(fingerprint: string, vdIDs: string[]) {
        // TODO check
        this.deps.virtualDiskWorkerActions.setRemoteVirtualDisksProvided(fingerprint, vdIDs);
    }

    /**
     * Set remote virtual disk offline
     * */
    onRevokeVirtualDisk(fingerprint: string, vdID: string) {
        // TODO check
        this.deps.virtualDiskWorkerActions.setRemoteVirtualDiskOffline(fingerprint, vdID);
    }

    /**
     * Add remote virtual disk
     * */
    onCreateVirtualDisk(vd: VirtualDiskData) {
        // TODO check
        this.deps.virtualDiskWorkerActions.addRemoteVirtualDisk(vd);
    }

    /**
     * Remove remote or local virtual disk
     * */
    onRemoveVirtualDisk(vdID: string) {
        // TODO check
        if (this.deps.virtualDiskWorkerActions.getLocalVirtualDisk(vdID))
            this.deps.virtualDiskWorkerActions.removeLocalVirtualDisk(vdID);
        else
            this.deps.virtualDiskWorkerActions.removeRemoteVirtualDisk(vdID);
    }

    onWebRTCOfferReceived(fingerprint: string, offer: string) {
        // TODO check
        this.deps.webrtcWorkerActions.answerToOffer(fingerprint, offer);
    }

    onWebRTCAnswerReceived(fingerprint: string, answer: string) {
        // TODO check
        this.deps.webrtcWorkerActions.setRemoteAnswer(fingerprint, answer);
    }

    onToLocalIceCandidateReceived(fingerprint: string, candidate: string) {
        // TODO check
        // Reverse toLocal and toRemote
        this.deps.webrtcWorkerActions.setCandidate(fingerprint, candidate, false);
    }

    onToRemoteIceCandidateReceived(fingerprint: string, candidate: string) {
        // TODO check
        // Reverse toLocal and toRemote
        this.deps.webrtcWorkerActions.setCandidate(fingerprint, candidate, true);
    }
}

export type $SocketListenersHandlers = { socketListenersHandlers: SocketListenersHandlers }
