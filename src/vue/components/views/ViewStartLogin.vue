<template>
  <div class="window login">
    <ComponentPreloader :is-loading="isLoading"/>
    <RouterLink to="/registration" class="to-link">Регистрация</RouterLink>
    <h1>Вход</h1>
    <div class="input-panel">
      <ControlTextbox v-model="input.login" placeholder="E-mail или номер телефона"/>
      <ControlTextbox v-model="input.password" placeholder="Пароль" input-type="password"/>
    </div>
    <ControlButton @click="onSubmit"
                   :disabled="!isEnable"
                   class="submit-button">Подтвердить
    </ControlButton>
  </div>
</template>

<script setup lang="ts">
import ControlTextbox from "@/components/controls/ControlTextbox.vue";
import ControlButton from "@/components/controls/ControlButton.vue";
import ComponentPreloader from "@/components/generals/ComponentPreloader.vue";
import {computed, reactive, ref} from "vue";
import {container} from "@/composition/DIContainer";
import {router} from "@/router";

const isLoading = ref(false);

const input = reactive({
  login: null,
  password: null
})

const isEnable = computed(() => input.login && input.password)

async function onSubmit() {
  isLoading.value = true;
  if (await container.workerOverlayWindowLogin.login({
    login: input.login!,
    password: input.password!
  })) router.replace("/workspace");
  isLoading.value = false;
}
</script>

<style scoped lang="scss">
@use "./view-start-window-style";
</style>