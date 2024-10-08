import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/**/*.ts'],
    format: 'cjs',
    outDir: 'dist/cjs',
    dts: true, // Output types to a common directory
    sourcemap: true,
    clean: true, // Cleans the output directory
  },
  {
    entry: ['src/**/*.ts'],
    format: 'esm',
    outDir: 'dist/esm',
    dts: false, // Only generate .d.ts once (in the CJS build)
    sourcemap: true,
  }
]);