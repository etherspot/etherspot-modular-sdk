import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/**/*.ts'],
    format: 'cjs',
    outDir: 'dist/cjs',
    dts: true, // Output types to a common directory
    sourcemap: true,
    clean: true, // Cleans the output directory
    target: ['esnext'],
    cjsInterop: true,
    platform: 'neutral',
  }
]);