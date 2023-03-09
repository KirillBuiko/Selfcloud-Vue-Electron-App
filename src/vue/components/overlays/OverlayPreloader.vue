<template>
  <div :class="{active: isLoading}" class="loader">
    <LogoRotating/>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import LogoRotating from "@/components/icon/LogoRotating.vue";

defineProps<{isLoading: boolean}>()
</script>

<style scoped lang="scss">
.loader{
  background-color: black;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  top:0;
  left:0;
  z-index: 10;
  background-color: rgba(0,0,0,0.8);
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;

  &.active{
    pointer-events: all;
    opacity: 1;
  }
}
</style>
