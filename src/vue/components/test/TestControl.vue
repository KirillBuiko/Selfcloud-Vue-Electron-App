<template>
  <!--  <div class="overlay"></div>-->
  <div class="wrapper">
    <input class="error-checkbox" type="checkbox" v-model="inputError">
    <ControlTextbox
        class="textbox"
        placeholder="Логин"
        error-text="Error"
        v-model="textValue"
        :error="inputError"
    />
    <div>{{textValue}}</div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import ControlTextbox from "../controls/ControlTextbox.vue";
const textValue = ref("");
const inputError = ref(true);

</script>

<style scoped lang="scss">
.overlay{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  pointer-events: none;
  background-color: rgba(0,0,0,0.1);
}
.error-checkbox{
  width: 30px;
  height: 30px;
}

</style>
