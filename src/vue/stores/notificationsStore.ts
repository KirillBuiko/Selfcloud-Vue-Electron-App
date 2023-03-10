import { defineStore } from 'pinia'

export interface NotificationInput{
    header: string;
    body: string;
    type: "error" | "notify" | "warning";
    duration?: number;
}

export interface Notification extends NotificationInput{
    id: number;
    isShow: boolean;
    isClosing: boolean;
}

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notificationsList: [] as Notification[],
        timerList: {} as {[id: number]: number},
        defaultDuration: 3000,
        id: 0
    }),
    getters: {
        activeNotificationsList(state){
            const list = [] as Notification[];
            for(const note of state.notificationsList) {
                if(note.isShow)
                    list.push(note);
            }
            return list;
        }
    },
    actions: {
        addNotification(note: NotificationInput){
            const notification = note as Notification;
            notification.id = this.id++;

            if(notification.duration === undefined) notification.duration = this.defaultDuration;
            this.notificationsList.push(notification);

            notification.isShow = true;
            notification.isClosing = false;
            this.startNotificationTimer(notification.id);
        },
        getNotification(id: number){
            for(const note of this.notificationsList){
                if(note.id === id){
                    return note;
                }
            }
            return undefined;
        },
        showNotification(id: number){
            const note = this.getNotification(id);
            if(note) {
                console.log(`SHOW ${id}`)
                note.isShow = true;
                this.stopNotificationTimer(id);
            }
        },
        hideNotification(id: number){
            const note = this.getNotification(id);
            if(note) this.hideNotificationByInst(note);
        },
        hideNotificationByInst(note: Notification){
            note.isShow = false;
            this.stopNotificationTimer(note.id);
        },
        hideAllNotifications(){
            this.notificationsList.forEach(note => {this.hideNotificationByInst(note)})
        },
        startNotificationTimer(id: number){
            const note = this.getNotification(id);
            if(note === undefined || this.timerList[id] !== undefined) return;
            this.timerList[id] = setTimeout(() => {
                this.stopNotificationTimer(id);
                this.hideNotification(id);
            }, note.duration);
        },
        startHideNotificationTimerAll(){
            //
        },
        stopNotificationTimer(id: number){
            if(this.timerList[id] === undefined) return;
            clearTimeout(this.timerList[id]);
            delete this.timerList[id]
        }
    }
})
