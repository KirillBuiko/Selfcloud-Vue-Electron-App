import type {RouteRecordRaw} from "vue-router";
import ViewStart from "../view/ViewStart.vue";
import ViewWorkspace from "../view/ViewWorkspace.vue";
import TestMenu from "@/components/test/TestMenu.vue";
import ViewStartRegistration from "@/components/view-start/ViewStartRegistration.vue";
import ViewWorkspaceSectionPersonalAccount from "@/components/view-workspace/ViewWorkspaceSectionPersonalAccount.vue";
import ViewWorkspaceSectionConnections from "@/components/view-workspace/ViewWorkspaceSectionConnections.vue";
import ViewWorkspaceSectionVirtualDisks from "@/components/view-workspace/ViewWorkspaceSectionVirtualDisks.vue";

const ViewStartLogin = await (() => import("@/components/view-start/ViewStartLogin.vue"))

export const viewRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: ViewStart,
        children: [
            {
                path: '/',
                component: ViewStartLogin
            },
            {
                path: '/registration',
                component: ViewStartRegistration
            }
        ]
    },
    {
        path: '/test',
        component: TestMenu
    },
    {
        name: 'workspace',
        path: '/workspace',
        component: ViewWorkspace,
        children: [
            {
                name: 'workspace-virtual-disks',
                path: '',
                component: ViewWorkspaceSectionVirtualDisks
            },
            {
                name: 'workspace-connections',
                path: 'connections',
                component: ViewWorkspaceSectionConnections
            },
            {
                name: 'workspace-personal-account',
                path: 'personal-account',
                component: ViewWorkspaceSectionPersonalAccount
            }]
    }
];
