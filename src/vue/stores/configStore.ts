import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";

export const useConfigStore = defineStore('configStore', {
    state: () => ({
        darkMode: useLocalStorage('config-dark-mode', false),
        isLogin: useLocalStorage('config-is-login', false),
    }),
    getters: {},
    actions: {
        setIsLogin(val: boolean) {
            this.isLogin = val;
        },
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
        },
    },
})

export type $ConfigStore = { configStore: ReturnType<typeof useConfigStore> }
