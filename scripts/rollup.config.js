import typescript from 'rollup-plugin-typescript2';

import pkg from '../package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'terre',
      format: 'umd',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};
