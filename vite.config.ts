import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // This loads the environment variables (like your API key) from the .env file.
  const env = loadEnv(mode, '.', '');

  return {
    // --- START OF CRITICAL FIX FOR GITHUB PAGES ---
    // This sets the base public path for the build output. 
    // For GitHub Pages, this MUST be your repository name to ensure 
    // assets (like index.js and index.css) are loaded from the correct subdirectory.
    base: '/myportfolio/',
    // --- END OF CRITICAL FIX FOR GITHUB PAGES ---

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],

    // This is your original setup for exposing environment variables
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    // This is your original path alias setup
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});

