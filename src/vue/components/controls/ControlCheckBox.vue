<template>
  <div class="checkbox-wrapper" >
    <input :id="id"
           class="checkbox-input"
           type="checkbox"
           :checked="modelValue"
           @change="emits('update:modelValue', $event.target.checked)"/>
    <label class="checkbox-label" :for="id">
      <div class="checkbox-mark" :class="{active: modelValue}"/>
      <div class="checkbox-text">
        <slot/>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, onMounted, ref} from "vue";

defineProps<{ modelValue?: boolean }>()

const emits = defineEmits(['update:modelValue'])
const buttonStatus = ref(false);
const id = ref("");

onMounted(() => {
  id.value = "checkbox-input-" + Math.random().toString();
});
</script>

<style scoped lang="scss">
.checkbox-wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;

  *{
    cursor: pointer;
  }

  .checkbox-input{
    display: none;
  }

  .checkbox-label {
    display: flex;
    flex-direction: row;
    align-items: center;

    .checkbox-mark {
      width: 25px;
      height: 25px;
      border: 2px solid #444;
      border-radius: 4px;
      background-color: white;

      &.active {
        background-color: cadetblue;
      }
    }

    .checkbox-text {
      font-size: 18px;
      margin-left: 5px;
    }

    &:hover{
      .checkbox-mark {
        border-color: #000;
      }
    }
  }


}
</style>