<template>
  <div class="vd-local-list">
    <component :is="isRemote ? VirtualDiskRemoteItem : VirtualDiskLocalItem"
               class="vd-list-item"
               v-for="[vdID, vd] in vds"
               :vd="vd"
               :vdID="vdID"
               :key="vdID"
               @delete="onDelete(vdID)"/>
  </div>
</template>

<script setup lang="ts">
import VirtualDiskLocalItem from "@/components/virtual-disks/VirtualDiskLocalItem.vue";
import {container} from "@/composition/DIContainer";
import VirtualDiskRemoteItem from "@/components/virtual-disks/VirtualDiskRemoteItem.vue";
import {defineProps} from "vue";

const props = defineProps<{
  isRemote: boolean
}>()

const vds = container.virtualDiskStore.getAll(props.isRemote);

function onDelete(vdID: string) {
  props.isRemote
      ? container.virtualDiskWorkerActions.removeRemoteVirtualDisk(vdID)
      : container.virtualDiskWorkerActions.removeLocalVirtualDisk(vdID)
}

</script>

<style scoped lang="scss">
.vd-list-item {
  margin-bottom: 5px;
}
</style>