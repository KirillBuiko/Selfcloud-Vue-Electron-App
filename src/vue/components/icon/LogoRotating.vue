<template>
  <div class="logo_rotating" ref="logo">
    <img src="/src/vue/assets/icons/SC-Logo-Hollow.svg" alt="">
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const logo = ref<HTMLElement>();
const width = ref<string>("0px");
const maxWidth = ref("unset");

setTimeout(() => {
  if (logo.value && logo.value.parentElement) {
    const parent = logo.value.parentElement;
    width.value = Math.min(parent.clientHeight, parent.clientWidth) * 0.6 + 'px';
    maxWidth.value = "200px";
  }
}, 10)
</script>

<style scoped lang="scss">
@keyframes logoRounding {
  0% {
    transform: rotate3d(0, 1, 0, 0);
  }
  45% {
    transform: rotate3d(0, 1, 0, 180deg);
  }
  90% {
    transform: rotate3d(0, 1, 0, 0);
  }
}

.logo_rotating {
  max-width: v-bind("maxWidth");
  width: v-bind("width");
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease-in;

  animation-name: logoRounding;
  animation-timing-function: cubic-bezier(.47, .1, .52, .85);
  animation-duration: 1.5s;
  animation-iteration-count: infinite;

  img {
    width: 100%;
    height: 100%;
  }
}

</style>
