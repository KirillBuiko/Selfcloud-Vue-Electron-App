<template>
  <ViewWorkspaceSectionContainer>
    <template v-slot:header>Виртуальные диски</template>
    <div class="main-section-wrapper">
      <div class="widget-panel-buttons">
        <ControlButtonRound class="widget-add-button"
                            @click="onVDAdd">
          <img src="src/vue/assets/icons/plus.png" alt="">
        </ControlButtonRound>
      </div>
      <div class="actions-wrapper">
        <b>Локальные виртуальные диски:</b>
        <VirtualDiskList :is-remote="false"/>
      </div>
      <div class="actions-wrapper">
        <b>Удалённые виртуальные диски:</b>
        <VirtualDiskList :is-remote="true"/>
      </div>
    </div>
  </ViewWorkspaceSectionContainer>
</template>

<script setup lang="ts">
import ViewWorkspaceSectionContainer from "@/components/view-workspace/ViewWorkspaceSectionContainer.vue";
import ControlButtonRound from "@/components/controls/ControlButtonRound.vue";
import VirtualDiskList from "@/components/virtual-disks/VirtualDiskList.vue";
import {container} from "@/composition/DIContainer";

async function onVDAdd() {
  // TODO: put here add vd code
  container.virtualDiskWorkerActions.createLocalVirtualDisk({
    localPath: "C:\\SelfCloud\\Storage",
    name: "Виртуальный диск " + Math.round(Math.random()*100).toString(),
    totalSizeBytes: 10000,
    remainedSizeBytes: 1000
  });
}
</script>

<style scoped lang="scss">
.main-section-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .widget-panel-buttons{
    position: absolute;
    bottom: 40px;
    right: 40px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: fit-content;
    height: fit-content;
    z-index: 10;

    .widget-add-button{
      flex: 0 0 auto;
      width: 70px;
      height: 70px;
      margin-left: 20px;

      img {
        filter: invert(100%);
        width: 50px;
      }
    }
  }

  .actions-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1 0;
    border: 1px solid white;
    padding: 10px;
    margin: 20px;
    min-height: 200px;
    color: white;

    b {
      margin-bottom: 10px;
    }

    &.list-item-wrapper {
      min-height: 200px;
    }
  }
}

::-webkit-scrollbar{
  width: 0;
}
</style>