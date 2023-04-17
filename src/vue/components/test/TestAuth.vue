<template>
  <div>
    <div>
      <div v-if="!isCookieEnabled()">Куки недоступны! Всё в локале</div>
      <div v-else>Куки доступны</div>
      <div>Ответ: {{requestResult}}</div>
      <ControlButton @click="loginPassword()">Логин (пароль)</ControlButton>
      <ControlButton @click="loginToken()">Логин (токен)</ControlButton>
      <ControlButton @click="registration()">Регистрация</ControlButton>
      <ControlButton @click="registrationWrong()">Регистрация (Неправильный пароль)</ControlButton>
      <ControlButton @click="logout()">Выйти</ControlButton>
    </div>
    <div class="overlay flex items-center justify-center" :class="{active: isLoading}">
      <div class="w-4/12 h-2/3 bg-gray-400 rounded-xl"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountRequestClass from "@/packages/request/AccountRequestClass";
import type {ResponseData} from "@/types/Objects";
import {ref} from "vue";
import {ResultCode} from "@/types/ResultCode";
import ControlButton from "@/components/controls/ControlButton.vue";
import {container} from "@/composition/DIContainer";

const password = "qwe123@#$QWE"
const passwordWrong = "qwe123"

const accountHandler = container.accountRequestActions;
let requestResult = ref("0");
let isLoading = ref(false);

async function loginPassword(){
    requestResult.value = "";
    setResult(await accountHandler.loginPassword({login: "k.buiko04@mail.ru", password: password}));
}

async function loginToken(){
    requestResult.value = "";
    setResult(await accountHandler.loginToken());
}

async function registration(){
  requestResult.value = "";
  setResult(await accountHandler
      .registration({email: "k.buiko04@mail.ru", phone: "79137428483", password: password}));
}

async function registrationWrong(){
  requestResult.value = "";
  setResult(await accountHandler
      .registration({email: "k.buiko05@mail.ru", phone: "70137428483", password: passwordWrong}));
}

async function logout(){
  requestResult.value = "";
  setResult(await accountHandler.logout());
}

function openOverlay(){
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
}

function setResult(response: ResponseData<object>){
  let res;
  switch(response.code){
    case ResultCode.OK:
      res = "ОК";
      break;
    case ResultCode.CONNECTION_ERROR:
      res = "Ошибка сети";
      break;
    case ResultCode.CONFIGURATION_ERROR:
      res = "Ошибка конфигурации";
      break;
    default:
      res = response.code.toString();
  }
  requestResult.value = res;
}

function isCookieEnabled(){
  return navigator.cookieEnabled;
}
</script>

<style scoped lang="scss">
</style>
