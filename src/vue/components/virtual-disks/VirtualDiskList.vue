<template>
  <div class="vd-local-list">
    <component :is="isLocal ? VirtualDiskLocalItem : VirtualDiskRemoteItem"
               class="vd-list-item"
               v-for="[vdID, vd] in vds"
               :vd="vd"
               :key="vdID"
               @click="onDelete(vdID)"/>
  </div>
</template>

<script setup lang="ts">
import VirtualDiskLocalItem from "@/components/virtual-disks/VirtualDiskLocalItem.vue";
import {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import {container} from "@/composition/DIContainer";
import VirtualDiskRemoteItem from "@/components/virtual-disks/VirtualDiskRemoteItem.vue";
import {defineProps} from "vue";
import {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";

const props = defineProps<{
  isLocal: boolean
}>()

const vd =
    props.isLocal
        ? new LocalVirtualDiskClass({
          vdID: "1231231231",
          localPath: "C:\\SelfCloud\\Storage",
          name: "Виртуальный диск 1",
          totalSizeBytes: 10000,
          remainedSizeBytes: 1000
        })
        : new RemoteVirtualDiskClass({
          vdID: "66665656",
          localPath: "C:\\SelfCloud\\Storage",
          name: "Виртуальный диск 2",
          totalSizeBytes: 10000,
          remainedSizeBytes: 1000,
          fingerprint: "123123123",
          isOnline: true
        })

// const VDs =
//     props.isLocal
//         ? container.virtualDiskWorkerActions.getAllLocalVirtualDisks()
//         : container.virtualDiskWorkerActions.getAllRemoteVirtualDisks()
const vds = new Map().set(vd.getConfig().vdID, vd);
vds.set("5667763", vd);

function onDelete(vdID: string) {
  props.isLocal
      ? container.virtualDiskWorkerActions.removeLocalVirtualDisk(vdID)
      : container.virtualDiskWorkerActions.removeRemoteVirtualDisk(vdID)
}

</script>

<style scoped lang="scss">
.vd-local-item {
  margin-bottom: 10px;
}
</style>