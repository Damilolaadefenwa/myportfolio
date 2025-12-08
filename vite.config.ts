import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // This loads the environment variables (like your API key) from the .env file.
  const env = loadEnv(mode, '.', '');

  return {
    // --- CRITICAL FIX FOR GITHUB PAGES ---
    // This tells Vite to prefix all asset paths (like /assets/image.png) 
    // with the repository name, ensuring they load correctly on GitHub Pages.
    base: '/myportfolio/',
    // --- END OF CRITICAL FIX ---

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],

    // Setup for exposing environment variables
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    // Path alias setup
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});