<template>
  <div class="vd-local-list">
    <WebRTCItem class="vd-local-item"
                v-for="[fingerprint, connection] in connections"
                :connection="connection"
                :key="fingerprint"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {WebRTCConnectionClass} from "@/packages/webrtc/WebRTCConnectionClass";
import WebRTCItem from "@/components/webrtc-connections/WebRTCItem.vue";

const props = defineProps<{
  isToLocal: boolean
}>()

// @ts-ignore
const connection: WebRTCConnectionClass = new WebRTCConnectionClass("123123", props.isToLocal, undefined);

// const connections = container.webrtcStore.getAll(props.isToLocal)
const connections = new Map().set(connection.fingerprint, connection);
connections.set("5667763", connection);
</script>

<style scoped lang="scss">
.vd-local-item {
  margin-bottom: 10px;
}
</style>