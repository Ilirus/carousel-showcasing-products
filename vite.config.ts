/// <reference types="vitest/config" />
import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        svgr(),
    ],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@contexts': path.resolve(__dirname, './src/contexts'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@app-types': path.resolve(__dirname, './src/types'),
            '@api': path.resolve(__dirname, './src/api'),
            '@features': path.resolve(__dirname, './src/features'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
    },
    base: '/carousel-showcasing-products/',
})
