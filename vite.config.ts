import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({}) => {
  return {
    plugins: [react()],
    build: {
      outDir: path.join(__dirname, 'build')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
