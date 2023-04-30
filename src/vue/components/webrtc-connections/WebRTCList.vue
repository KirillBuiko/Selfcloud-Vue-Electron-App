<template>
  <div class="vd-local-list">
    <WebRTCItem class="vd-local-item"
                v-for="(connection, ind) in connections"
                :connection="connection"
                :key="ind"
                :is-to-local="isToLocal"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps, watch} from "vue";
import WebRTCItem from "@/components/webrtc-connections/WebRTCItem.vue";
import {container} from "@/composition/DIContainer";

const props = defineProps<{
  isToLocal: boolean
}>()

const connections = container.webrtcStore.getAll(props.isToLocal)
watch(connections, (v) => {
  console.log(v);
})


</script>

<style scoped lang="scss">
.vd-local-item {
  margin-bottom: 10px;
}
</style>