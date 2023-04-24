<template>
  <div>
    <div>
      <div>Статус подключения: {{ socketStore.state.connected ? "Покдлючено" : "Отключено" }}</div>
      <ControlButton @click="onConnectClick()">Подключить</ControlButton>
      <ControlButton @click="onDisconnectClick()">Отключить</ControlButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ControlButton from "@/components/controls/ControlButton.vue";
import {container} from "@/composition/DIContainer";

const socketStore = container.socketStore;

async function onConnectClick(){
  socketStore.connect();
}

async function onDisconnectClick(){
  socketStore.disconnect();
}
</script>

<style scoped lang="scss">
</style>
