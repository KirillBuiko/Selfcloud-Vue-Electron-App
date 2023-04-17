import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from "@/App.vue";
import {router} from '@/router'
import '@/assets/tailwind.css'
import {containerInit} from "@/composition/DIContainer";

const app = createApp(App)
app.use(createPinia());
app.use(router)

containerInit();

app.mount('#app')
