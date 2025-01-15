import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import commonjs from '@rollup/plugin-commonjs';
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    open: true,
    port: 3000,
  },
  esbuild: {
    loader: 'jsx',  // This line is changed
    include: /.*\.[jt]sx?$/,
    exclude: [],
  }
})
