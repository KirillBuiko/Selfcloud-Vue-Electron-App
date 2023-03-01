<template>
  <NotificationList/>
  <OverlayContainer/>
  <RouterView/>
</template>

<script setup lang="ts">
import OverlayContainer from "./components/OverlayContainer.vue";
import NotificationList from "./components/NotificationList.vue";
</script>

<style scoped>

</style>
