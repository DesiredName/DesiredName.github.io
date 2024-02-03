import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    build: {
        assetsDir: './public',
        outDir: './dist',
        minify: 'terser',
        cssMinify: 'lightningcss',
    },
    plugins: [vue()],
});
