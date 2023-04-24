<template>
  <div>
    <ControlCheckBox v-model="inputError"/>
    <ControlTextbox
        class="textbox"
        placeholder="Логин"
        error-text="Error"
        v-model="textValue"
        :error="inputError"
    />
    <div>{{textValue}}</div>
    <div class="preloader-wrapper">
      <ComponentPreloader :is-loading="inputError"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import ControlTextbox from "@/components/controls/ControlTextbox.vue";
import ControlCheckBox from "@/components/controls/ControlCheckBox.vue";
import ComponentPreloader from "@/components/generals/ComponentPreloader.vue";
const textValue = ref("");
const inputError = ref(true);
</script>

<style scoped lang="scss">
.error-checkbox{
  width: 30px;
  height: 30px;
}

.preloader-wrapper{
  position: relative;
  width: 300px;
  height: 300px;
}
</style>
