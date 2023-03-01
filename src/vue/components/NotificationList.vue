<template>
  <div class="list">
    <template v-for="note in notifications" :key="note.id">
      <NotificationListItem :note="note"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import NotificationListItem from "./NotificationListItem.vue";
import {useNotificationsStore} from "../stores/notificationsStore";
import {storeToRefs} from "pinia";

const notificationsStore = useNotificationsStore()
const notifications = storeToRefs(notificationsStore).notifications;

</script>

<style scoped lang="scss">
.list{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  width: 600px;
  height: 100%;
  overflow-y: hidden;
  display: block;
}
</style>
