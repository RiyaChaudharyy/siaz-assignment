import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds a single self-mounting IIFE: it finds #saiz-widget-container, reads the
// data-* attributes and injects its own scoped CSS, so a host page needs one
// <script> tag. The dev proxy below only applies to `npm run dev`.
export default defineConfig({
  plugins: [react()],
  // React/Redux read process.env.NODE_ENV; inline it so the IIFE runs in a
  // plain browser without a `process` global.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  server: {
    // Hit the staging API through a same-origin path to dodge CORS in dev.
    // Set VITE_SAIZ_BASE_URL= (empty) in .env.local so requests go to /api/...
    proxy: {
      '/api': {
        target: 'https://staging-saiz-app.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    cssCodeSplit: false,
    // inline the avatar image into the JS so the widget ships as one file
    assetsInlineLimit: 1024 * 1024,
    lib: {
      entry: 'src/main.tsx',
      name: 'SaizWidget',
      formats: ['iife'],
      fileName: () => 'saiz-widget.js',
    },
  },
});
