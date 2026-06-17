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
            // Centralizza ed unifica tutti i motori grafici e stilistici
            '@emotion/react': require.resolve('@emotion/react'),
            '@emotion/styled': require.resolve('@emotion/styled'),
            '@mui/styled-engine': require.resolve('@mui/styled-engine'),
            // Forza anche la risoluzione della cartella principale di MUI materiale
            '@mui/material': require.resolve('@mui/material'),
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