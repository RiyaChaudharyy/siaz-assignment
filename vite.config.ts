import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],

    server: {
      proxy: {
        '/api/saiz': {
          target: 'https://staging-saiz-app.com',
          changeOrigin: true,
          secure: true,
          headers: {
            'SAIZ-API-KEY': env.SAIZ_API_KEY,
          },
          rewrite: (path) => {
            const url = new URL(path, 'http://localhost');
            const brandCode = url.searchParams.get('brandCode') ?? '';
            const productCode = url.searchParams.get('productCode') ?? '';

            return `/api/Product/GetProductForWidget/${encodeURIComponent(
              brandCode,
            )}/${encodeURIComponent(productCode)}`;
          },
        },
      },
    },
  };
});
