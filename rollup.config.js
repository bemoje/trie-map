// @ts-check

import { terser } from 'rollup-plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';

import PKG from './package.json';
import CONFIG from './.repo-manager.config.json';

const banner = `/*!
 * ${PKG.name} v${PKG.version}
 * (c) ${PKG.author.name}
 * Homepage: ${PKG.homepage}
 * Released under the ${PKG.license} License.
 */
`;

const options = {
  input: './src/index.ts',
  output: (() => {
    const createOutputOptions = (options) => {
      return {
        banner,
        name: CONFIG.bundler.exports.default,
        exports: 'named',
        sourcemap: true,
        ...options,
      };
    };
    const options = CONFIG.bundler.output;
    const output = [];
    if (options.commonjs) {
      output.push(
        createOutputOptions({
          file: './dist/index.js',
          format: 'commonjs',
        }),
      );
    }
    if (options.esm) {
      output.push(
        createOutputOptions({
          file: './dist/index.esm.js',
          format: 'esm',
        }),
      );
    }
    if (options.umd) {
      output.push(
        createOutputOptions({
          file: './dist/index.umd.js',
          format: 'umd',
        }),
      );
    }
    if (options.umdMinified.enabled) {
      output.push(
        createOutputOptions({
          file: './dist/index.umd.min.js',
          format: 'umd',
          plugins: [terser(options.umdMinified.options)],
        }),
      );
    }
    return output;
  })(),
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
};

export default options;
