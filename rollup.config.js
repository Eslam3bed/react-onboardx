// File: rollup.config.js

const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts");

const packageJson = require("./package.json");

const config = [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json', // Ensure your tsconfig is properly set
        declaration: true, // Generate declaration files
        declarationDir: 'dist/types', // Output dir for declaration files
        exclude: ['**/*.d.ts'], // Exclude already generated declaration files from Rollup
      }),
    ],
    external: ["react", "react-dom"],
  }
];

module.exports = config;