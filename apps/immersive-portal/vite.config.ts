import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(__dirname, '../../public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets/immersive',
    sourcemap: false,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        ppdb: path.resolve(__dirname, 'ppdb/index.html'),
        berita: path.resolve(__dirname, 'berita/index.html'),
        beritaDetail: path.resolve(__dirname, 'berita/pembukaan-ppdb-2026.html'),
        programTkj: path.resolve(__dirname, 'program/tkj.html'),
        programRpl: path.resolve(__dirname, 'program/rpl.html'),
        programDkv: path.resolve(__dirname, 'program/dkv.html'),
      },
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['gsap', 'motion', 'lenis'],
        },
      },
    },
  },
});
