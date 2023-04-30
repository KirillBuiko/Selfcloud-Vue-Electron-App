<template>
  <header class="unit-econ-wrapper">
    <div class="logo">
      <img src="src/vue/assets/icons/SC-Logo-Hollow.svg" alt="">
    </div>
    <ControlButtonRoundWhite class="menu-button"/>
  </header>
</template>

<script setup lang="ts">
import ControlButtonRoundWhite from "@/components/controls/ControlButtonRoundWhite.vue";
</script>

<style scoped lang="scss">
header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-inline: 30px;
  background-color: black;
  height: 60px;
  width: 100%;
  flex: 0 0 auto;

  .logo{
    display: flex;
    align-items: center;
    width: 50px;
    height: 100%;
  }

  .logo, .menu-button{
    width: 50px;
    height: 50px;
  }
}
</style>