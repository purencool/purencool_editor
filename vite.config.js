import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    emptyOutDir: false,
    sourcemap: process.env.MODE !== 'production',
    outDir: "dist",
    manifest: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, './src/main.jsx'),
      },
    },
  }
})

