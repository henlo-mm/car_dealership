import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'hooks': path.resolve(__dirname, './src/hooks'),
      'services': path.resolve(__dirname, './src/services'),
      'auth': path.resolve(__dirname, './src/hooks/useAuth'),
    }
  }
})
