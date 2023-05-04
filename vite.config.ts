import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src/vue', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/socket.io': {
                target: 'http://localhost:40000',
                secure: false,
                ws: true,
            },
            '/request': {
                target: 'http://127.0.0.1:35000',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})
