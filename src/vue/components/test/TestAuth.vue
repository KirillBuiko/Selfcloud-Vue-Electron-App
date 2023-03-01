<template>
  <div class="ml-10">
    <div v-if="!isCookieEnabled()">Куки недоступны! Всё в локале</div>
    <div v-else>Куки доступны</div>
    <div>Ответ: {{requestResult}}</div>
    <button @click="loginPassword()">Логин (пароль)</button>
    <button @click="loginToken()">Логин (токен)</button>
    <button @click="registration()">Регистрация</button>
    <button @click="registrationWrong()">Регистрация (Неправильный пароль)</button>
    <button @click="logout()">Выйти</button>
  </div>
  <div class="overlay flex items-center justify-center" :class="{active: isLoading}">
    <div class="w-4/12 h-2/3 bg-gray-400 rounded-xl"></div>
  </div>
</template>

<script setup lang="ts">
import AccountRequestClass from "@/packages/request/AccountRequestClass";
import type {ResponseData} from "@/Objects";
import {ref} from "vue";
import {ResultCode} from "@/ResultCode";

const password = "qwe123@#$QWE"
const passwordWrong = "qwe123"

const accountHandler = new AccountRequestClass();
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
  button{
    display: block;
    width: 200px;
    height: 70px;
    margin-block: 10px;
    border: 2px solid black;
    &:hover{
      border-width: 3px;
    }
    &:active{
      border-width: 2px;
    }
  }
  .overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    transition: all 0.6s;
    clip-path: circle(0% at 105% -5%);
    &.active{
      clip-path: circle(100%);
      background: rgba(0,0,0,0.5);
    }
  }
</style>
