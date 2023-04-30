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
    <div class="actions-wrapper list-item-wrapper">
      <b>Локальные виртуальные диски:</b>
      <VirtualDiskList :is-remote="false"/>
    </div>
    <div class="actions-wrapper list-item-wrapper">
      <b>Удалённые виртуальные диски:</b>
      <VirtualDiskList :is-remote="true"/>
    </div>
    <div class="actions-wrapper rtc-wrapper">
      <b>Подключения WebRTC к локальному устройству</b>
      <WebRTCList :is-to-local="true"/>
    </div>
    <div class="actions-wrapper rtc-wrapper">
      <b>Подключения WebRTC к удалённому устройству</b>
      <WebRTCList :is-to-local="false"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ControlButton from "@/components/controls/ControlButton.vue";
import {container} from "@/composition/DIContainer";
import VirtualDiskList from "@/components/virtual-disks/VirtualDiskList.vue";
import WebRTCList from "@/components/webrtc-connections/WebRTCList.vue";

const socketStore = container.socketStore;

async function onConnectClick() {
  socketStore.connect();
}

async function onDisconnectClick() {
  socketStore.disconnect();
}

async function onVDAdd() {
  // TODO: put here add vd code
  container.virtualDiskWorkerActions.createLocalVirtualDisk({
    localPath: "C:\\SelfCloud\\Storage",
    name: "Виртуальный диск " + Math.round(Math.random()*100).toString(),
    totalSizeBytes: 10000,
    remainedSizeBytes: 1000
  });
}

// onConnectClick();

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

    &.list-item-wrapper {
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
