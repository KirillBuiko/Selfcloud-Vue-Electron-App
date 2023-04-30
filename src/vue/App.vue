<template>
  <div class="app-wrapper">
    <NotificationList/>
    <OverlayContainer/>
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import NotificationList from "@/components/notifications/NotificationList.vue";
import OverlayContainer from "@/components/overlays/OverlayContainer.vue";</script>

<style scoped>
.app-wrapper {
  height: 100vh;
  overflow: auto;
}
</style>
