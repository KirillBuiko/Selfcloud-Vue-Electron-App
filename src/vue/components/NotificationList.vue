<template>
  <div class="notification-list-wrapper"
       @click="noteLog">
    <div :class="{active: activeNotificationsList.length !== 0}"
         class="clear-button"
         @click="hideAllNotifications()"/>
    <div class="list">
      <template v-for="note in notificationsStore.notificationsList" :key="note.id">
        <Transition name="list" appear>
          <NotificationListItem v-if="note.isShow" :id="'note_item_'+note.id" :note="note"/>
        </Transition>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotificationListItem from "@/components/NotificationListItem.vue";
import {storeToRefs} from "pinia";
import {container} from "@/composition/DIContainer";

const notificationsStore = container.notificationStore;
const {activeNotificationsList} = storeToRefs(notificationsStore);
const {hideAllNotifications} = notificationsStore;


function noteLog() {
  console.log(activeNotificationsList.value)
}

</script>

<style scoped lang="scss">
.notification-list-wrapper {
  position: absolute;
  display: inline-flex;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;
  text-align: center;
  height: 100%;
  overflow-y: hidden;
  width: 700px;
  pointer-events: none;
}

.clear-button {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border: 2px solid black;
  opacity: 0;
  margin-top: 5px;
  border-radius: 100px;
  background-color: #FFF;
  transition: opacity 0.3s ease;

  &.active {
    pointer-events: all;
    opacity: 1;
  }

  &:hover {
    border-width: 3px;
  }

  &:active {
    border-width: 1px;
  }

}

.list {
  width: 600px;
  height: 100%;
  display: block;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  height: 0;
  margin-block: 0;
  border-width: 0;
  opacity: 0.1;
}
</style>
