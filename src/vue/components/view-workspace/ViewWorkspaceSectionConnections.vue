<template>
  <ViewWorkspaceSectionContainer>
    <template v-slot:header>Подключения</template>
    <div class="main-section-wrapper">
      <div class="socket-status">
        <img src="src/vue/assets/icons/socket-io.svg" alt="" :class="{active: container.socketStore.state.connected}">
        <b>Статус подключения сокета: {{ container.socketStore.state.connected ? "Подключено" : "Отключено" }}</b>
      </div>
      <div class="rtc-wrapper">
        <div class="actions-wrapper">
          <b>Подключения WebRTC к этому устройству</b>
          <WebRTCList :is-to-local="true"/>
        </div>
        <div class="actions-wrapper">
          <b>Подключения WebRTC к удалённому устройству</b>
          <WebRTCList :is-to-local="false"/>
        </div>
      </div>
    </div>
  </ViewWorkspaceSectionContainer>
</template>

<script setup lang="ts">
import ViewWorkspaceSectionContainer from "@/components/view-workspace/ViewWorkspaceSectionContainer.vue";
import WebRTCList from "@/components/webrtc-connections/WebRTCList.vue";
import {container} from "@/composition/DIContainer";
</script>

<style scoped lang="scss">
.main-section-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .socket-status {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 22px;
    margin-left: 30px;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      filter: invert(100%) sepia(1) hue-rotate(305deg) saturate(1000);

      &.active {
        filter: invert(100%) sepia(1) hue-rotate(20deg) saturate(1000);
      }
    }
  }

  .rtc-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .actions-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1 0;
    border: 1px solid black;
    padding: 10px;
    margin: 20px;
    min-height: 200px;
    min-width: 500px;

    b {
      margin-bottom: 10px;
    }

    &.list-item-wrapper {
      min-height: 200px;
    }
  }
}

::-webkit-scrollbar {
  width: 0;
}
</style>