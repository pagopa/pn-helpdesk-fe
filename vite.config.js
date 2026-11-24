import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        global: 'window',
    },
    test: {
        globals: true, // <-- FONDAMENTALE: rende globali describe, it, expect, beforeEach
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        server: {
            deps: {
                inline: ['msw'], // <-- Risolve l'errore Directory import di MSW v1
            },
        },
    },
});