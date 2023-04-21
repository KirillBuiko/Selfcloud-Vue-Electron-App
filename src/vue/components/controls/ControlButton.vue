<template>
  <div class="button-wrapper">
    <button @click="(e) => $emit('click', e)">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import {defineEmits} from "vue";

defineEmits(['click'])

</script>

<style scoped lang="scss">
.button-wrapper{
  width: 300px;
  height: 70px;
}

button{
  display: block;
  width: 100%;
  height: 100%;
  margin-block: 10px;
  border: 2px solid black;
  &:hover{
    border-width: 3px;
  }
  &:active{
    border-width: 2px;
  }
}
</style>
