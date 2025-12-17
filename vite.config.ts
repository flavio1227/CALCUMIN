import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: './',
  build: {
    // Para GitHub Pages es común usar la carpeta "docs" como salida,
    // así GitHub puede servir la app directamente desde la rama principal.
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    target: 'es2015', // Better compatibility with older browsers
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging in production
        drop_debugger: true,
        pure_funcs: ['console.debug']
      },
      format: {
        comments: false
      },
      safari10: true // Better Safari compatibility
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          qrcode: ['qrcode.react']
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        // Ensure proper module format for cPanel
        format: 'es',
        exports: 'named'
      }
    }
  },
  // Enhanced server configuration for better compatibility
  server: {
    host: true,
    port: 5173,
    strictPort: false
  },
  // Better preview configuration
  preview: {
    host: true,
    port: 4173,
    strictPort: false
  }
});