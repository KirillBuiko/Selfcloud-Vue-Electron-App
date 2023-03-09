<template>
  <div>
    <ControlButton @click="workerViewStart.openLoginOverlay()">Оверлей логина</ControlButton>
    <ControlButton @click="workerViewStart.openRegistrationOverlay()">Оверлей регистрации</ControlButton>
  </div>
</template>

<script setup lang="ts">
import {WorkerViewStart} from "@/component-class/WorkerViewStart";
import ControlButton from "@/components/controls/ControlButton.vue";
const workerViewStart = new WorkerViewStart()
</script>

<style scoped lang="scss">

</style>
