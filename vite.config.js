// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import string from 'vite-plugin-string';

export default defineConfig({
  plugins: [react(), string()],
  build: {
    // Disable the chunk size warning
    chunkSizeWarningLimit: Infinity,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Get the name of the directory directly under 'node_modules'
            // This assumes that the package name is the first part of the path within 'node_modules'
            const packageName = id.split('node_modules/')[1].split('/')[0];

            // Return a chunk name based on the package name
            // e.g. 'node_modules/react/index.js' will become 'vendor_react'
            return `vendor_${packageName}`;
          }
        }
      }
    }
  }
});
