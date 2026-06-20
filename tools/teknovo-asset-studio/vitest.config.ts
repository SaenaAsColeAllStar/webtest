import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@teknovo-asset-studio/core': path.resolve(__dirname, 'packages/core/src/index.ts'),
      '@teknovo-asset-studio/preview': path.resolve(__dirname, 'packages/preview/src/index.ts'),
      '@teknovo-asset-studio/asset-engine': path.resolve(__dirname, 'packages/asset-engine/src/index.ts'),
      '@teknovo-asset-studio/r2': path.resolve(__dirname, 'packages/r2/src/index.ts')
    }
  },
  test: {
    environment: 'node',
    include: ['packages/**/*.test.ts']
  }
});
