<template>
  <div>
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
import ControlTextbox from "@/components/controls/ControlTextbox.vue";
const textValue = ref("");
const inputError = ref(true);
</script>

<style scoped lang="scss">
.error-checkbox{
  width: 30px;
  height: 30px;
}
</style>
