<template>
  <OverlayHeader><slot name="headerText"/></OverlayHeader>
  <slot name="menu"/>
  <slot/>
  <!--  TODO: make decoration-->
</template>

<script setup lang="ts">
import OverlayHeader from "./OverlayHeader.vue"
</script>

<style scoped>

</style>
