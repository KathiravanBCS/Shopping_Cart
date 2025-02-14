import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ShoppingCart/' // Replace 'ShoppingCart' with your repository name
});