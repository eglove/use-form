import * as fs from 'node:fs'
import { build as esbuild } from 'esbuild'
import { globPlugin } from 'esbuild-plugin-glob'
import { rimraf } from 'rimraf'

await rimraf('dist').catch()

await esbuild({
  bundle: false,
  entryPoints: ['src/*.ts'],
  loader: { '.ts': 'ts' },
  minify: true,
  outdir: 'dist',
  platform: 'browser',
  plugins: [globPlugin()],
  sourcemap: true,
  target: 'esnext',
})

fs.copyFileSync(
  'package.json',
  'dist/package.json',
)

execSync('cd dist && npm publish --access public && cd ..')

