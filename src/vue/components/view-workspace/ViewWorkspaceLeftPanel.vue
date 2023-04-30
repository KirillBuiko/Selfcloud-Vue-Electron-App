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
                               @click="router.replace(n.path); isDescShow=false;">
        <img class="button-image" :src="n.iconSrc"/>
      </ControlButtonRoundWhite>
    </div>
    <div class="desc-panel" ref="descPanel" :class="{show: isDescShow}">
      <div class="desc-item"
           v-for="n in sectionsList"
           :key="n.path">
        {{ n.desc }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import ControlButtonRound from "@/components/controls/ControlButtonRound.vue";
import ControlButtonRoundWhite from "@/components/controls/ControlButtonRoundWhite.vue";

const sectionsList: { path: string, iconSrc: string, desc: string }[] = [
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
    desc: "Выход"
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
</script>

<style scoped lang="scss">
$bg-color: #999;
$desc-clip-per: 100%;
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
    padding-left: 30px;
    background-color: #444;
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.2s;

    &.show {
      clip-path: inset(0 0 0 0);
    }

    .desc-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: $button-width + $button-panel-gap * 2;
      flex: 0 0 auto;
      width: 100%;
      color: white;
      font-size: 22px;
      line-height: 1.2em;
    }
  }
}
</style>