import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    reactRouter(),
    tsconfigPaths(),
  ],
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
  server: {
    allowedHosts: ['0d02-2001-1c00-a68e-c700-e180-5cfd-8c9c-2765.ngrok-free.app']
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [],
    },
  },
});
