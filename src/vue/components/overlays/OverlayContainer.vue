<template>
  <div class="overlay-container-wrapper" :class="{active: isOpen}">
    <div class="background-wrapper" @click="backgroundClick">
      <component :is="overlays[overlayName]"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as overlays from "@/components/overlays/index"
import {container} from "@/composition/DIContainer";

const overlayStore = container.overlayStore;
const {overlayName, isOpen} = overlayStore

function backgroundClick(e: Event) {
  if (e.target === e.currentTarget) overlayStore.closeOverlay();
}

</script>

<style scoped lang="scss">
.overlay-container-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;

  .background-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.6s;
    clip-path: circle(0% at 105% -5%);
  }
}

.overlay-container-wrapper.active {
  pointer-events: all;

  .background-wrapper {
    clip-path: circle(100%);
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
