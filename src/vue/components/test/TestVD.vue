<template>
  <div class="test-wrapper">
    <div class="actions-wrapper">
      <b>Действия сокета</b>
      <div class="buttons-panel">
        <span class="socket-status" :class="{active: socketStore.state.connected}"/>
        <ControlButton @click="onConnectClick()" class="button">Подключить</ControlButton>
        <ControlButton @click="onDisconnectClick()" class="button">Отключить</ControlButton>
      </div>
    </div>
    <div class="actions-wrapper">
      <b>Действия виртуальных дисков</b>
      <div class="buttons-panel">
        <ControlButton @click="onVDAdd()" class="button">Добавить ВД</ControlButton>
      </div>
    </div>
    <div class="actions-wrapper vd-wrapper">
      <b>Локальные виртуальные диски:</b>
      <VirtualDiskLocalList/>
    </div>
    <div class="actions-wrapper vd-wrapper">
      <b>Удалённые виртуальные диски:</b>
      <VirtualDiskRemoteList/>
    </div>
    <div class="actions-wrapper rtc-wrapper">
      <b>Подключения WebRTC к локальному устройству</b>
    </div>
    <div class="actions-wrapper rtc-wrapper">
      <b>Подключения WebRTC к удалённому устройству</b>
    </div>
  </div>
</template>

<script setup lang="ts">
import ControlButton from "@/components/controls/ControlButton.vue";
import {container} from "@/composition/DIContainer";
import VirtualDiskLocalList from "@/components/virtual-disks/VirtualDiskLocalList.vue";
import VirtualDiskRemoteList from "@/components/virtual-disks/VirtualDiskRemoteList.vue";

const socketStore = container.socketStore;

async function onConnectClick() {
  socketStore.connect();
}

async function onDisconnectClick() {
  socketStore.disconnect();
}

async function onVDAdd() {
  // TODO: put here add vd code
}
</script>

<style scoped lang="scss">
.test-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  .actions-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1 0;
    border: 3px solid black;
    margin-block: 10px;
    padding: 10px;
    min-width: 500px;
    margin-right: 20px;
    margin-bottom: 20px;

    b {
      margin-bottom: 10px;
    }

    .buttons-panel {
      display: flex;
      flex-direction: row;
      flex: 1 0 auto;
      flex-wrap: wrap;

      .button {
        margin-right: 10px;
        flex: 1 0;
        min-width: 200px;
        height: 45px;
      }
    }

    &.vd-wrapper {
      min-height: 100px;
    }

    &.rtc-wrapper {
      min-height: 100px;
    }
  }

  .socket-status {
    width: 30px;
    border-radius: 8px;
    border: 2px solid black;
    background-color: red;
    margin-left: 10px;
    margin-right: 10px;

    &.active {
      background-color: rgb(0, 255, 0);;
    }
  }
}
</style>
