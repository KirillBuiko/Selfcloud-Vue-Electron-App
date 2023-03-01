<template>
  <div class="textbox-wrapper">
    <span :class="{active: error}" class="error-text">{{errorText}}</span>
    <div class="input-block">
      <input
          :type="inputType"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          placeholder=" "/>
      <label class="placeholder">{{placeholder}}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, withDefaults} from "vue";

withDefaults(defineProps<{
  inputType?: string,
  placeholder: string,
  errorText?: string,
  modelValue?: string,
  error?: boolean}>(), {
  inputType: "text",
  errorText: "",
  error: false
})
defineEmits(['update:modelValue'])

</script>

<style scoped lang="scss">

.textbox-wrapper{
  height: fit-content;
  display: block;
  margin: 0;
  $left-padding: 12px;

  .error-text{
    font-size: 17px;
    color: crimson;
    font-style: italic;
    height: 50px;
    width: 100%;
    margin-left: 5px;
    visibility: hidden;

    &.active{
      visibility: visible;
    }
  }
  .input-block{
    position: relative;
    height: 50px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;

    .placeholder{
      position: absolute;
      top: 0;
      left: $left-padding+5;
      font-size: 28px;
      width: fit-content;
      pointer-events: none;
      transition: .1s;
      color: #555;
    }
    input{
      font-size: 18px;
      padding: 10px 0px 0 $left-padding;
      height: 100%;
      width: 100%;
      bottom: 0;
      border-width: 3px;
      border-color: #555;
      outline: none;
      box-sizing: border-box;
      transition: border-width 0.1s linear, border-color 0.1s linear;

      &:focus{
        border-color: #111;
      }
      &:focus+.placeholder, &:not(:placeholder-shown)+.placeholder{
        font-size: 13px;
      }
    }
  }
}
</style>
