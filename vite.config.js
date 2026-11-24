import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        global: 'window',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        // Genera il report dei test nel formato XML richiesto da SonarQube
        reporters: ['default', 'vitest-sonar-reporter'],
        outputFile: {
            'vitest-sonar-reporter': 'sonar-report.xml',
        },
        // Genera il report della coverage (lcov) per SonarQube
        coverage: {
            provider: 'v8', // oppure 'istanbul'
            reporter: ['text', 'lcov'],
            reportsDirectory: './coverage',
        },
    },
});
