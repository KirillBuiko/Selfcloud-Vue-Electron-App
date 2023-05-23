<template>
  <div class="section">
    <h1>
      <slot name="header"></slot><span class="id-info-text">Идентификатор устройства: {{ container.authStore.fingerprint.value }}</span>
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
  background-color: white;

  .id-info-text {
    color: black;
    font-size: 20px;
    font-style: italic;
    font-weight: normal;
    margin-left: 15px;
  }

  h1 {
    color: black;
    font-size: 30px;
    font-weight: bold;
    padding: 10px 30px;
  }

  main {
    flex: 1 0;
    height: 100px;
  }
}
</style>