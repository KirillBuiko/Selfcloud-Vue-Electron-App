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
.button-wrapper{
  width: 100px;
  height: 100px;
  border-radius: 999px;
}

button{
  display: block;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 999px;
  border: 2px solid black;

  &.enabled {
    &:hover {
      border-width: 3px;
    }
    &:active {
      border-width: 2px;
    }
  }
}
</style>
