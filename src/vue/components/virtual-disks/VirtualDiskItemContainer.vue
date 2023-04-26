<template>
  <div class="vd-wrapper">
    <header>
      <div class="header-text"><slot name="header"/></div>
      <ControlButton @click="emit('delete')" class="delete-button">Удалить</ControlButton>
    </header>
    <main>
      <slot name="main"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import ControlButton from "@/components/controls/ControlButton.vue";
import {defineEmits} from "vue";

const emit = defineEmits<{
  (e: 'delete'): void
}>();
</script>

<style lang="scss">
.vd-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    border: 3px solid brown;
    padding: 5px;

    .header-text {
      font-size: 20px;
      font-weight: bold;
    }

    .delete-button{
      height: 100%;
      width: 100px;
    }
  }

  main {
    min-height: 100px;
    border: 3px solid brown;
    border-top: 0;
    padding: 5px 12px;

    .property-grid{
      display: grid;
      grid-template-columns: 150px 1fr;
      grid-gap: 5px;
      align-items: center;

      .property-text{
        font-weight: bold;
      }

      .property-indicator{
        width: 50px;
        height: 15px;
        background-color: red;
        border-radius: 8px;
        border: 2px solid black;

        &.active{
          background-color: rgb(0,255,0);
        }
      }
    }
  }
}
</style>