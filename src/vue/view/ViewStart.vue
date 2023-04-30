<template>
  <div class="view-start-wrapper">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {container} from "@/composition/DIContainer";

const router = useRouter();

window.addEventListener('keydown', (e) => {
  if (e.code == "KeyT" && e.ctrlKey && e.altKey) {
    router.push("/test");
  }
});

if (container.configStore.isLogin)
  router.push("/workspace")
</script>

<style scoped lang="scss">
.view-start-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
