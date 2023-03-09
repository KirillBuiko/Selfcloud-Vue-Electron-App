<template>
  <div class="notification-list-item-wrapper"
       @mouseenter="mouseEnterFunc"
       @mouseleave="mouseLeaveFunc">
    <div class="type-icon"
         :style="{backgroundColor: typeToColor[note.type]}"/>
    <div class="vertical-separator"/>
    <main>
      <div class="header-wrapper">
        <div class="header-text">{{note.header}}</div>
        <button class="hide-button"
                @click="hideNotification(note.id)"/>
      </div>
      <div class="horizontal-separator"/>
      <div class="body-text">{{note.body}}</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import type {Notification} from "@/stores/notificationsStore";
import {useNotificationsStore} from "@/stores/notificationsStore";

const notificationStore = useNotificationsStore();
const {showNotification, hideNotification, startNotificationTimer} = notificationStore;

const props = defineProps<{
  note: Notification
}>()

const typeToColor = {
  'error': '#F21',
  'warning': '#FB0',
  'notify': '#09F'
}

function mouseEnterFunc(){
  showNotification(props.note.id);
}

function mouseLeaveFunc(){
  startNotificationTimer(props.note.id);
}
</script>

<style scoped lang="scss">
.vertical-separator{
  height: 100%;
  width: 1px;
  background-color: black;
}

.horizontal-separator{
  height: 1px;
  width: 100%;
  background-color: black;
}

.notification-list-item-wrapper{
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: white;
  height: 80px;
  border: 1px solid black;
  overflow-y: hidden;
  margin-block: 5px;
  opacity: 1;
  pointer-events: all;

  .type-icon{
    width: 20px;
    height: 100%;
  }
  main{
    margin-left: 20px;
    flex-grow: 1;
    text-align: left;

    .header-wrapper {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .hide-button{
        width: 20px;
        height: 20px;
        background-color: black;
        margin-right: 5px;
      }
    }
  }
}
</style>
