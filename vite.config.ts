import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // allows access via localhost and network IP
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});