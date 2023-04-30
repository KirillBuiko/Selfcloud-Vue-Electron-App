<template>
  <div class="button-wrapper">
    <button @click="(e) => $emit('click', e)" :disabled="disabled" :class="{enabled: !disabled}">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, withDefaults} from "vue";

defineEmits(['click'])
withDefaults(defineProps<{
  disabled?: boolean
}>(), {
  disabled: false
})
</script>

<style scoped lang="scss">
.button-wrapper {
  width: 200px;
  height: 70px;
}

button {
  display: block;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  color: #999;

  &.enabled {
    color: black;

    &:hover {
      border-width: 3px;
    }

    &:active {
      border-width: 2px;
    }
  }
}
</style>
