import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default defineConfig({
    plugins: [
        react({

        }),
    ],

    resolve: {
        alias: {
            // Centralizza i motori di stile
            '@emotion/react': require.resolve('@emotion/react'),
            '@emotion/styled': require.resolve('@emotion/styled'),
            '@mui/styled-engine': require.resolve('@mui/styled-engine'),

            // Mappatura per @mui/material (singoli componenti e radice)
            '^@mui/material/(.+)': require.resolve('@mui/material'),
            '@mui/material': require.resolve('@mui/material'),

            // FIX PER PAGOPA: 
            // Se viene cercato "@pagopa/mui-italia/Qualcosa", lo reindirizza alla radice del pacchetto
            '^@pagopa/mui-italia/(.+)': require.resolve('@pagopa/mui-italia'),
            // Mantiene la mappatura della radice semplice
            '@pagopa/mui-italia': require.resolve('@pagopa/mui-italia'),
        },
    },

    optimizeDeps: {
        include: [
            '@emotion/react',
            '@emotion/styled',
            '@mui/styled-engine',
            '@mui/material',
            '@mui/material/colors', // <-- FONDAMENTALE: Forza l'inclusione dei colori per evitare init_blue
            '@mui/material/styles',
            '@mui/icons-material',
            '@pagopa/mui-italia'
        ],
    },
    server: {
        port: 3030,
        open: true,
    },
    build: {
        outDir: 'build',
    }
});