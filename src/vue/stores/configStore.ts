import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";

export const useConfigStore = defineStore('counter', {
    state: () => ({
        darkMode: useLocalStorage('config-dark-mode', false),
        isLogin: useLocalStorage('config-is-login', false),
    }),
    getters: {
    },
    actions: {
        setIsLogin(val: boolean) {
            this.isLogin = val;
        },
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
        },
    },
})
