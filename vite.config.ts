import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://staging-saiz-app.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
