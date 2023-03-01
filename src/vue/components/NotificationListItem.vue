<template>
  <div class="notification-list-item-wrapper"
       :class="{active: note.isShow}"
       @mouseenter="stopNotificationTimer(note.id)"
       @mouseleave="startNotificationTimer(note.id)">
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
const {showNotification, hideNotification, startNotificationTimer, stopNotificationTimer} = notificationStore;

const props = defineProps<{
  note: Notification
}>()
console.log(props.note.isShow)

setTimeout(() => {
  showNotification(props.note.id);
}, 1);

const typeToColor = {
  'error': '#F21',
  'warning': '#FB0',
  'notify': '#09F'
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
  height: 0;
  opacity: 0;
  overflow-y: hidden;
  transition-duration: 0.2s;
  transition: all 0.2s;
  margin-block: 0;
  border-width: 0;

  &.active{
    border: 1px solid black;
    opacity: 1;
    height: 80px;
    margin-block: 5px;
  }

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
