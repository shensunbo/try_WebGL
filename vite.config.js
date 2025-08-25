import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        open: true  // 启动时自动打开浏览器
    },
    build: {
        outDir: 'docs', // 将默认的 'dist' 改为 'docs'
    }
});