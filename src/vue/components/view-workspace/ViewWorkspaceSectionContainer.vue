<template>
  <div class="section">
    <h1>
      <slot name="header"></slot><span class="id-info-text">ID устройства: {{ container.authStore.fingerprint.value }}</span>
    </h1>
    <main>
      <slot/>
    </main>
  </div>
</template>

<script setup lang="ts">
import {container} from "@/composition/DIContainer";
</script>

<style scoped lang="scss">
.section {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: auto;
  height: 100%;
  width: auto;
  background-color: #222;

  .id-info-text {
    color: #555;
    font-size: 18px;
    font-style: italic;
    font-weight: lighter;
    margin-left: 15px;
  }

  h1 {
    color: white;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
    padding: 10px 30px;
  }

  main {
    flex: 1 0;
    height: 100px;
  }
}
</style>