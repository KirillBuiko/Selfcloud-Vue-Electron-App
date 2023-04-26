<template>
  <div class="vd-local-list">
    <VirtualDiskLocalItem class="vd-local-item"
                          v-for="[vdID, vd] in localVDs"
                          :vd="vd"
                          :key="vdID"
                          @click="onDelete(vdID)"/>
  </div>
</template>

<script setup lang="ts">
import VirtualDiskLocalItem from "@/components/virtual-disks/VirtualDiskLocalItem.vue";
import {LocalVirtualDiskClass} from "@/packages/virtual-disk/LocalVirtualDiskClass";
import {container} from "@/composition/DIContainer";

const localVD = new LocalVirtualDiskClass({
  vdID: "1231231231",
  localPath: "C:\\SelfCloud\\Storage",
  name: "Виртуальный диск 1",
  totalSizeBytes: 10000,
  remainedSizeBytes: 1000
});

// const localVDs = container.virtualDiskWorkerActions.getAllLocalVirtualDisks();
const localVDs = new Map().set(localVD.getConfig().vdID, localVD);
localVDs.set("5667763", localVD);

function onDelete(vdID: string){
  container.virtualDiskWorkerActions.removeLocalVirtualDisk(vdID);
}

</script>

<style scoped lang="scss">
.vd-local-item {
  margin-bottom: 10px;
}
</style>