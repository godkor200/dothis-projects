import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['lib/index.ts', 'components/index.ts'],
  sourcemap: true,
  clean: true,
  splitting: false,
  format: ['cjs', 'esm'],
  minify: !options.watch,
  dts: true,
  outDir: "dist/",
  external: [
    "react",
    'react-dom', /^@chakra-ui/, /^@emotion/
  ]
}))