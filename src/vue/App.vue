<template>
  <NotificationList/>
  <OverlayContainer/>
  <RouterView/>
</template>

<script setup lang="ts">
console.log("app")
import NotificationList from "@/components/NotificationList.vue";
import OverlayContainer from "@/components/OverlayContainer.vue";

</script>

<style scoped>

</style>
