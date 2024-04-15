import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from "node:url";
import vueI18n from '@intlify/vite-plugin-vue-i18n';

const excludedFiles = ["src/views/fees.vue"]

const filesPathToExclude = excludedFiles.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url));
});

export default defineConfig({
    plugins: [
        vue(),
        vueI18n({
            include: path.resolve(__dirname, './src/locales/**'),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        include: ['quill'],
    },
    server: {
        hmr: {
            host: "localhost",
            protocol: "ws",
        },
    },
    build: {
        manifest: true,
        rollupOptions: {
            external: [
                ...filesPathToExclude
                ],
            }
    },
});
