<template>
  <div class="view-workspace-wrapper">
    <ComponentPreloader :is-loading="!isWindowShown"/>
    <ViewWorkspaceHeader/>
    <div class="middle-wrapper">
      <ViewWorkspaceLeftPanel/>
      <div class="section-wrapper">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {container} from "@/composition/DIContainer";
import {ref, watch, WatchStopHandle} from "vue";
import ComponentPreloader from "@/components/generals/ComponentPreloader.vue";
import {useRouter} from "vue-router";
import ViewWorkspaceHeader from "@/components/view-workspace/ViewWorkspaceHeader.vue";
import ViewWorkspaceLeftPanel from "@/components/view-workspace/ViewWorkspaceLeftPanel.vue";

const router = useRouter();
const isWindowShown = ref(false);

if(!container.socketStore.state.connected){
  let unwatch: WatchStopHandle;
  unwatch = watch(container.socketStore.state, (v) => {
    console.log(container.socketStore.state);
    if (v.connected)
      isWindowShown.value = true;
    else if (v.connectionError)
      router.replace("/");
    unwatch();
  })

  container.socketStore.connect()
} else {
  isWindowShown.value = true;
}
</script>

<style scoped lang="scss">
.view-workspace-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .middle-wrapper {
    display: flex;
    flex-direction: row;
    flex: 1 0 0;
    align-items: stretch;
    overflow: hidden;

    .section-wrapper {
      flex: 1 0;
      width: 100px;
    }
  }
}
</style>
