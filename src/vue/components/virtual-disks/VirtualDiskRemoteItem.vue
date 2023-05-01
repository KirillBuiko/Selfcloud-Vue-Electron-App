<template>
  <div class="list-item-wrapper">
    <header>
      <div class="header-text">
        {{ vd.getConfig().name }}
        <span class="vd-id-text">{{ vd.getConfig().vdID }}</span>
      </div>
      <ControlButton @click="onDelete" class="delete-button">Удалить</ControlButton>
    </header>
    <main>
      <div class="property-grid">
        <div class="property-text">ID устройства:</div>
        <div class="property-value">{{ vd.getConfig().fingerprint }}</div>
        <div class="property-text">Путь к диску:</div>
        <div class="property-value">{{ vd.getConfig().localPath }}</div>
        <div class="property-text">Проверено:</div>
        <div class="property-indicator" :class="{active: vd.states.checkStatus}"/>
        <div class="property-text">Проверяется:</div>
        <div class="property-indicator" :class="{active: vd.states.isChecking}"/>
        <div class="property-text">Готов к подключению:</div>
        <div class="property-indicator" :class="{active: vd.remoteStates.isRemoteReady}"/>
        <div class="property-text">Подключён:</div>
        <div class="property-indicator" :class="{active: vd.remoteStates.remoteConnectionStatus}"/>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps} from "vue";
import {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import ControlButton from "@/components/controls/ControlButton.vue";

defineProps<{
  vd: RemoteVirtualDiskClass
}>()

const emit = defineEmits<{
  (e: 'delete'): void
}>();

function onDelete() {
  emit("delete");
}

</script>

<style lang="scss">
@use "@/assets/styles/ListItemStylesheet.scss" with (
  $border-color: orange
);
</style>