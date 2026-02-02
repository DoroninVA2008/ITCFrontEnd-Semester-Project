import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
       outDir: 'dist', // Папка для выходных файлов
       emptyOutDir: true, // Очистить папку перед сборкой
       rollupOptions: {
         // Настройки Rollup (используется Vite под капотом)
       },
     },
  plugins: [react()],
  server: {
    port: 1447,
    open: true,
    host: true
  }
})