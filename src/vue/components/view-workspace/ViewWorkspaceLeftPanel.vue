<template>
  <div class="menu-wrapper">
    <div class="buttons-panel"
         @scroll="onScroll"
         ref="buttonPanel"
         @mouseenter="isDescShow=true"
         @mouseleave="isDescShow=false">
      <ControlButtonRoundWhite class="section-button"
                               v-for="n in sectionsList"
                               :key="n.path"
                               @click="n.onclick ? n.onclick() : null; router.replace(n.path); isDescShow=false;">
        <img class="button-image" :src="n.iconSrc" alt="Выбор"/>
      </ControlButtonRoundWhite>
    </div>
    <div class="desc-panel" ref="descPanel" :class="{show: isDescShow}">
      <div class="desc-item"
           v-for="n in sectionsList"
           :key="n.path">
        <div class="separator"/>
        <div class="desc-text">{{ n.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import ControlButtonRound from "@/components/controls/ControlButtonRound.vue";
import ControlButtonRoundWhite from "@/components/controls/ControlButtonRoundWhite.vue";
import {container} from "@/composition/DIContainer";

const sectionsList: { path: string, iconSrc: string, desc: string, onclick?: ()=>void }[] = [
  {
    path: "/workspace",
    iconSrc: "src/vue/assets/icons/virtual-disks.svg",
    desc: "Виртуальные диски"
  },
  {
    path: "/workspace/connections",
    iconSrc: "src/vue/assets/icons/connections.svg",
    desc: "Соединения"
  },
  {
    path: "/workspace/personal-account",
    iconSrc: "src/vue/assets/icons/personal-account.svg",
    desc: "Личный кабинет"
  },
  {
    path: "/",
    iconSrc: "src/vue/assets/icons/exit.svg",
    desc: "Выход",
    onclick: onLogout
  }
]

const router = useRouter();
const descPanel = ref<HTMLElement | null>(null);
const buttonPanel = ref<HTMLElement | null>(null);
const isDescShow = ref(false);

function onScroll() {
  if (descPanel.value && buttonPanel.value) {
    descPanel.value.scrollTop = buttonPanel.value.scrollTop;
  }
}

function onLogout(){
  container.accountRequestActions.logout();
  container.socketStore.disconnect();
  router.replace("/");
}
</script>

<style scoped lang="scss">
$bg-color: #BBB;
$desc-clip-per: 100%;
$desc-separator-height: 2px;
$button-panel-width: 90px;
$button-panel-gap: 10px;
$button-width: 65px;

.menu-wrapper {
  background-color: $bg-color;
  width: $button-panel-width;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  z-index: 5;

  .buttons-panel {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    padding-left: 18px;
    overflow-y: auto;
    width: $button-panel-width;

    &:hover {
      $desc-clip-per: 0%;
    }

    .section-button {
      width: $button-width;
      height: $button-width;
      margin-block: $button-panel-gap;
      background-color: white;
      border-radius: 999px;
      flex: 0 0 auto;

      .button-image{
        width: 40px;
        height: 40px;
      }
    }
  }

  .desc-panel {
    position: relative;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
    width: 250px;
    padding: 0 10px 0 20px;
    background-color: #444;
    border-right: 3px solid black;
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.2s;

    &.show {
      clip-path: inset(0 0 0 0);
    }

    .desc-item {
      width: 100%;

      .desc-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        height: $button-width + $button-panel-gap * 2 - $desc-separator-height;
        flex: 0 0 auto;
        width: 100%;
        color: white;
        font-size: 22px;
        line-height: 1.2em;
      }

      &:nth-child(1) .separator{
        display: none;
      }
      .separator {
        width: 100%;
        height: $desc-separator-height;
        background: white;
      }
    }
  }
}
</style>