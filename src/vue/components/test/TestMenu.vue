<template>
  <div class="menu-wrapper ml-10">
    {{ $route.path }}
    <nav v-show="!isSelected">
      <RouterLink to="/test/auth" custom v-slot="{ navigate }">
        <ControlButton @click="navigate(); isSelected=true;" role="link">Тест авторизации</ControlButton>
      </RouterLink>
      <RouterLink to="/test/overlay" custom v-slot="{ navigate }">
        <ControlButton @click="navigate(); isSelected=true;" role="link">Тест оверлеев</ControlButton>
      </RouterLink>
      <RouterLink to="/test/control" custom v-slot="{ navigate }">
        <ControlButton @click="navigate(); isSelected=true;" role="link">Тест элементов управления</ControlButton>
      </RouterLink>
      <RouterLink to="/test/notifications" custom v-slot="{ navigate }">
        <ControlButton @click="navigate(); isSelected=true;" role="link"> Тест уведомлений</ControlButton>
      </RouterLink>
      <RouterLink to="/test/socket" custom v-slot="{ navigate }">
        <ControlButton @click="navigate(); isSelected=true;" role="link"> Тест сокета</ControlButton>
      </RouterLink>
    </nav>
    <main v-show="isSelected">
      <RouterLink to="/test" custom v-slot="{ navigate }">
        <ControlButton @click="isSelected=false; navigate();" role="link">Назад</ControlButton>
      </RouterLink>

      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import ControlButton from "@/components/controls/ControlButton.vue";

const isSelected = ref(false)
isSelected.value = !window.location.href.endsWith("/test");
</script>

<style scoped lang="scss">
</style>
