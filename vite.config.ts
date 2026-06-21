import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

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
          rewrite: (path) =>
            path.replace(
              /^\/api\/saiz/,
              '/api/Product/GetProductForWidget',
            ),
        },
      },
    },
  };
});
