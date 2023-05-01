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
        <div class="property-value"
             :class="{[statusToClass[translateConnectionState[connection.states.connectionState][1]]]: true}">
          {{ translateConnectionState[connection.states.connectionState][0] }}
        </div>
        <div class="property-text">Статус сбора ICE кандидатов:</div>
        <div class="property-value"
             :class="{[statusToClass[translateIceGatheringState[connection.states.iceGatheringState][1]]]: true}">
          {{ translateIceGatheringState[connection.states.iceGatheringState][0] }}
        </div>
        <div class="property-text">Статус подключения ICE:</div>
        <div class="property-value"
             :class="{[statusToClass[translateIceConnectionState[connection.states.iceConnectionState][1]]]: true}">
          {{ translateIceConnectionState[connection.states.iceConnectionState][0] }}
        </div>
        <div class="property-text">Статус сигнализирования:</div>
        <div class="property-value"
             :class="{[statusToClass[translateSignalingState[connection.states.signalingState][1]]]: true}">
          {{ translateSignalingState[connection.states.signalingState][0] }}
        </div>
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

const statusToClass = ["red", "yellow", "green"];

const translateConnectionState: {[ind in RTCPeerConnectionState]: [string, number] } = {
  closed: ["Закрыто", 0],
  connected: ["Подключено", 2],
  connecting: ["Подключение", 1],
  disconnected: ["Отключено", 0],
  failed: ["Провал", 0],
  new: ["Новое подключение", 0]
}

const translateIceGatheringState: {[ind in RTCIceGathererState]: [string, number] } = {
  complete: ["Завершено", 2],
  gathering: ["Сбор", 1],
  new: ["Новое подключение", 0]
}

const translateIceConnectionState: {[ind in RTCIceConnectionState]: [string, number] } = {
  checking: ["Проверка", 1],
  closed: ["Закрыто", 0],
  completed: ["Завершено", 2],
  connected: ["Подключено", 2],
  disconnected: ["Отключено", 0],
  failed: ["Провал", 0],
  new: ["Новое подключение", 0]
}

const translateSignalingState: {[ind in RTCSignalingState]: [string, number] } = {
  "have-local-offer": ["Есть локальное предложение", 1],
  "have-local-pranswer": ["Есть локальный ответ", 1],
  "have-remote-offer": ["Есть удалённое предложение", 1],
  "have-remote-pranswer": ["Есть удалённый ответ", 1],
  closed: ["Закрыто", 0],
  stable: ["Стабильное", 2]
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/ListItemStylesheet.scss" with (
  $border-color: #77F
);

.vd-id-text {
  color: #BBB;
  font-weight: normal;
  font-style: italic;
  font-size: 16px;
}
</style>