import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    legacyOutput: true,
    format: ['cjs', 'esm', 'iife'],
    target: 'es5',
    treeshake: true,
    minify: !options.watch,
    async onSuccess() {
      if (options.watch) {
        console.log('---------- in dev ----------');
      }
      //   const server = http.createServer((req, res) => {
      //     res.end('Hello World!');
      //   });
      //   server.listen(3000);
      //   return () => {
      //     server.close();
      //   };
    },
  };
});
