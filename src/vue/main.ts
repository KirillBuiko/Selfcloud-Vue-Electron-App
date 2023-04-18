import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from "@/App.vue";
import {router} from '@/router'
import '@/assets/tailwind.css'
import {prodContainerInit} from "@/composition/prodContainerInit";

const app = createApp(App)
app.use(createPinia());
app.use(router)

prodContainerInit();

app.mount('#app')
