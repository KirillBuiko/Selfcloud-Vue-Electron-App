<template>
  <div class="vd-local-list">
    <VirtualDiskRemoteItem class="vd-local-item"
                           v-for="[vdID, vd] in remoteVDs"
                           :vd="vd"
                           :key="vdID"
                           @delete="onDelete(vdID)"/>
  </div>
</template>

<script setup lang="ts">
import VirtualDiskRemoteItem from "@/components/virtual-disks/VirtualDiskRemoteItem.vue";
import {RemoteVirtualDiskClass} from "@/packages/virtual-disk/RemoteVirtualDiskClass";
import {container} from "@/composition/DIContainer";

const remoteVD = new RemoteVirtualDiskClass({
  vdID: "6579574334546",
  localPath: "C:\\SelfCloud\\Storage",
  name: "Виртуальный диск 2",
  totalSizeBytes: 10000,
  remainedSizeBytes: 1000,
  fingerprint: "ER&^%4TRYGHr45",
  isOnline: false
});

// const localVDs = container.virtualDiskWorkerActions.getAllLocalVirtualDisks();
const remoteVDs = new Map().set(remoteVD.getConfig().vdID, remoteVD);
remoteVDs.set("5667763", remoteVD);

function onDelete(vdID: string) {
  container.virtualDiskWorkerActions.removeRemoteVirtualDisk(vdID);
}

</script>

<style scoped lang="scss">
.vd-local-item {
  margin-bottom: 10px;
}
</style>