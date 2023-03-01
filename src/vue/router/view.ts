import type {RouteRecordRaw} from "vue-router";
import ViewStart from "@/view/ViewStart.vue"
import ViewWorkspace from "@/view/ViewWorkspace.vue"

export const viewRoutes: RouteRecordRaw[] = [{
        path: '/',
        component: ViewStart
    },
    {
        name: 'workspace',
        path: '/workspace/:appName',
        component: ViewWorkspace
    }];
