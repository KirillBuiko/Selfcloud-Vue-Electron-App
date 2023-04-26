<template>
  <VirtualDiskItemContainer @delete="emit('delete')">
    <template v-slot:header>
      {{vd.getConfig().name}}
      <span class="vd-id-text">{{vd.getConfig().vdID}}</span>
    </template>
    <template v-slot:main>
      <div class="property-grid">
        <div class="property-text">Путь к диску:</div>
        <div class="property-value">{{ vd.getConfig().localPath }}</div>
        <div class="property-text">Проверено:</div>
        <div class="property-indicator" :class="{active: vd.checkStatus.value}"/>
        <div class="property-text">Проверяется:</div>
        <div class="property-indicator" :class="{active: vd.isChecking.value}"/>
      </div>
    </template>
  </VirtualDiskItemContainer>
</template>

<script setup lang="ts">
import VirtualDiskItemContainer from "@/components/virtual-disks/VirtualDiskItemContainer.vue";
import {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import {defineEmits, defineProps} from "vue";

defineProps<{
  vd: LocalVirtualDiskClass
}>()

const emit = defineEmits<{
  (e: 'delete'): void
}>();

</script>

<style scoped lang="scss">
.vd-id-text{
  color: #BBB;
  font-weight: normal;
  font-style: italic;
  font-size: 16px;
}
</style>