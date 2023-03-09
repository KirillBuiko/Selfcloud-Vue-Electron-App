<template>
  <OverlayTemplateDecorated class="overlay-window-wrapper" header-text="">
    <main>
      <header>Логин</header>
      <div class="input-block">
        <ControlTextbox
            placeholder="Логин"
            input-type="text"
            v-model="loginInput"/>
        <ControlTextbox
            placeholder="Пароль"
            input-type="password"
            v-model="passwordInput"/>
      </div>
      <ControlButton
          class="submit"
          @click="worker.login()">Подтвердить</ControlButton>
    </main>
  </OverlayTemplateDecorated>
</template>

<script setup lang="ts">
import OverlayTemplateDecorated from "@/components/overlays/OverlayTemplateDecorated.vue";
import ControlTextbox from "@/components/controls/ControlTextbox.vue";
import ControlButton from "@/components/controls/ControlButton.vue";
import {ref} from "vue";
import {WorkerOverlayWindowLogin} from "@/component-class/WorkerOverlayWindowLogin";

const loginInput = ref("")
const passwordInput = ref("")
const worker = new WorkerOverlayWindowLogin()

console.log("LOGIN WINDOW")

</script>

<style scoped lang="scss">
.overlay-window-wrapper{
  width:450px;
}

main{
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;

  header{
    font-size: 40px;
    margin-top: 30px;
  }

  .input-block{
    width: 300px;
  }

  .submit{
    font-size: 22px;
    margin-top: 20px;
    width: 200px;
  }
}
</style>
