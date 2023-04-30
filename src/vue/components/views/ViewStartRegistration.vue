<template>
  <div class="window registration">
    <ComponentPreloader :is-loading="isLoading"/>
    <RouterLink to="/" class="to-link">Вход</RouterLink>
    <h1>Регистрация</h1>
    <div class="input-panel">
      <ControlTextbox v-model="input.email" placeholder="E-mail" input-type="email"/>
      <ControlTextbox v-model="input.phone" placeholder="Телефон"/>
      <ControlTextbox v-model="input.name" placeholder="Имя"/>
      <ControlTextbox v-model="input.surname" placeholder="Фамилия"/>
      <ControlTextbox v-model="input.password" placeholder="Пароль" input-type="password"/>
      <ControlTextbox v-model="input.passwordRepeat" placeholder="Повтор пароля" input-type="password"/>
    </div>
    <ControlButton @click="onSubmit" :disabled="!isEnable" class="submit-button">Подтвердить</ControlButton>
  </div>
</template>

<script setup lang="ts">
import ControlTextbox from "@/components/controls/ControlTextbox.vue";
import ControlButton from "@/components/controls/ControlButton.vue";
import {computed, reactive, ref} from "vue";
import {container} from "@/composition/DIContainer";
import ComponentPreloader from "@/components/generals/ComponentPreloader.vue";

const isLoading = ref(false);

const input = reactive({
  email: null,
  phone: null,
  name: null,
  surname: null,
  password: null,
  passwordRepeat: null
})

const isEnable = computed(() => input.email && input.name && input.surname && input.phone && input.password &&
    (input.password == input.passwordRepeat) )

async function onSubmit() {
  isLoading.value = true;
  await container.workerOverlayWindowRegistration.registration({
    name: input.name!,
    email: input.email!,
    password: input.password!,
    phone: input.phone!,
    surname: input.surname!
  });
  isLoading.value = false;
}
</script>

<style scoped lang="scss">
@use "./view-start-window-style";
</style>