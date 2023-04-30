<template>
  <div class="list-item-wrapper">
    <header>
      <div class="header-text">
        Подключение {{ isToLocal ? " от устройства " : " к устройству " }} {{ connection.fingerprint }}
      </div>
    </header>
    <main>
      <div class="property-grid">
        <div class="property-text">Статус подключения:</div>
        <div class="property-value">{{ connection.states.connectionState }}</div>
        <div class="property-text">Статус сбора ICE кандидатов:</div>
        <div class="property-value">{{ connection.states.iceGatheringState }}</div>
        <div class="property-text">Статус подключения ICE:</div>
        <div class="property-value">{{ connection.states.iceConnectionState }}</div>
        <div class="property-text">Статус сигнализирования:</div>
        <div class="property-value">{{ connection.states.signalingState }}</div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {WebRTCConnectionClass} from "@/packages/webrtc/WebRTCConnectionClass";

defineProps<{
  connection: WebRTCConnectionClass,
  isToLocal: boolean
}>()
</script>

<style scoped lang="scss">
@use "@/assets/styles/ListItemStylesheet.scss" with (
  $border-color: blue
);
$border-color: green;

.vd-id-text {
  color: #BBB;
  font-weight: normal;
  font-style: italic;
  font-size: 16px;
}
</style>