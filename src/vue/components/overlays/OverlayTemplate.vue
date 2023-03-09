<template>
  <div class="template-wrapper" ref="templateWrapper">
    <OverlayPreloader :is-loading="isLoading"/>
    <OverlayHeader class="header">{{headerText}}</OverlayHeader>
    <div class="main-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import OverlayHeader from "@/components/overlays/OverlayHeader.vue";
import {defineProps} from "vue";
import {storeToRefs} from "pinia";
import {useOverlayStateStore} from "@/stores/overlayStore";
import OverlayPreloader from "@/components/overlays/OverlayPreloader.vue";

const {isLoading} = storeToRefs(useOverlayStateStore())

defineProps<{
  headerText: string
}>()

console.log("TEMPLATE")
</script>

<style scoped lang="scss">
.template-wrapper{
  position: relative;

  .header{
    width: 100%;
  }

  .main-wrapper{

  }
}
</style>
