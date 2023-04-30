<template>
  <ViewWorkspaceSectionContainer>
    <template v-slot:header>Виртуальные диски</template>
    <div class="main-section-wrapper">
      <div class="widget-panel-buttons">
        <ControlButtonRound class="widget-panel-settings-button"
                            @click="actions.openWidgetPanelSettingsOverlay()">SET</ControlButtonRound>
        <ControlButtonRound class="widget-add-button"
                            @click="actions.openWidgetAddOverlay()">ADD</ControlButtonRound>
      </div>
    </div>
  </ViewWorkspaceSectionContainer>
</template>

<script setup lang="ts">
import ViewWorkspaceSectionContainer from "@/components/view-workspace/ViewWorkspaceSectionContainer.vue";
import ControlButtonRound from "@/components/controls/ControlButtonRound.vue";
</script>

<style lang="scss">
.main-section-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .widget-panel-buttons{
    position: absolute;
    bottom: 40px;
    right: 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: fit-content;
    height: fit-content;
    z-index: 10;

    .widget-panel-settings-button{
      flex: 0 0 auto;
      width: 80px;
      height: 80px;
    }

    .widget-add-button{
      flex: 0 0 auto;
      width: 120px;
      height: 120px;
      margin-left: 20px;
    }
  }
}
</style>