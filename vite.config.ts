import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.158.148',
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});