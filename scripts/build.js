/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const esbuild = require('esbuild');
const cssModulesPlugin = require('esbuild-css-modules-plugin');

const args = process.argv.slice(2);

esbuild.build({
  logLevel: 'info',
  entryPoints: [path.join(__dirname, '../app/index.js')],
  outfile: path.join(__dirname, '../dist/screenshot.js'),
  bundle: true,
  external: ['html2canvas'],
  watch: args.includes('--watch'),
  minify: args.includes('--minify'),
  format: 'esm',
  plugins: [
    cssModulesPlugin(),
  ],
});
