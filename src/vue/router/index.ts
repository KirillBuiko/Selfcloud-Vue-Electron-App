import {createRouter, createWebHashHistory} from "vue-router";
import {testRoutes} from "@/router/test";
import {viewRoutes} from "@/router/view";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...testRoutes,
        ...viewRoutes
    ]
});
