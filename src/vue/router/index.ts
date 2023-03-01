import {createRouter, createWebHashHistory} from "vue-router";
import {testRoutes} from "./test";
import {viewRoutes} from "./view";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...testRoutes,
        ...viewRoutes
    ]
});
