export declare const useConfigStore: import("pinia").StoreDefinition<"counter", {
    darkMode: import("@vueuse/shared").RemovableRef<boolean>;
    isLogin: import("@vueuse/shared").RemovableRef<boolean>;
}, {
    isLogin: (state: {
        darkMode: boolean;
        isLogin: boolean;
    } & import("pinia").PiniaCustomStateProperties<{
        darkMode: import("@vueuse/shared").RemovableRef<boolean>;
        isLogin: import("@vueuse/shared").RemovableRef<boolean>;
    }>) => boolean;
}, {
    setIsLogin(val: boolean): void;
    toggleDarkMode(): void;
}>;
