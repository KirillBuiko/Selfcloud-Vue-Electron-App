<template>
  <NotificationList/>
  <OverlayContainer/>
  <RouterView/>
</template>

<script setup lang="ts">
import NotificationList from "@/components/NotificationList.vue";
import OverlayContainer from "@/components/overlays/OverlayContainer.vue";
</script>

<style scoped>

</style>
