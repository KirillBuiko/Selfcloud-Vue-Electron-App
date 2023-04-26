<template>
  <div class="test-wrapper">
    <div class="socket-actions-wrapper">
      <b>Действия сокета</b>
      <div>Статус подключения: {{ socketStore.state.connected ? "Покдлючено" : "Отключено" }}</div>
      <ControlButton @click="onConnectClick()">Подключить</ControlButton>
      <ControlButton @click="onDisconnectClick()">Отключить</ControlButton>
    </div>
    <div class="vd-actions-wrapper">
      <b>Действия виртуальных дисков</b>
      <div>Статус подключения: {{ socketStore.state.connected ? "Покдлючено" : "Отключено" }}</div>
      <ControlButton @click="onVDAdd()">Добавить ВД</ControlButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ControlButton from "@/components/controls/ControlButton.vue";
import {container} from "@/composition/DIContainer";

const socketStore = container.socketStore;

async function onConnectClick() {
  socketStore.connect();
}

async function onDisconnectClick() {
  socketStore.disconnect();
}

async function onVDAdd() {

}
</script>

<style scoped lang="scss">
.test-wrapper {
  & > div {
    border: 2px solid black;
    margin-block: 10px;
    padding: 10px;
  }

  .socket-actions-wrapper {

  }
}
</style>
