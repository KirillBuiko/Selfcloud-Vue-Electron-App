<template>
  <header>
    <span class="header-text">
      <slot/>
    </span>
    <button class="close-button" @click="overlayStore.closeOverlay()"></button>
  </header>
  <!--  TODO: make header-->
</template>

<script setup lang="ts">
import {container} from "@/composition/DIContainer";

const overlayStore = container.overlayStore;
</script>

<style scoped lang="scss">
$headerHeight: 50px;
header {
  display: flex;
  flex-direction: row;
  height: $headerHeight;
  position: relative;

  .header-text {
    font-size: 30px;
    height: 100%;
    line-height: $headerHeight;
    vertical-align: center;
    flex-grow: 1;
    text-align: center;
  }

  .close-button {
    position: absolute;
    right: 0;
    top: 0;
    height: $headerHeight;
    width: $headerHeight;
    background-color: #444;
  }
}
</style>
