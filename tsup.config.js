import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/index.server.ts"],
  splitting: true, // Enables code splitting
  format: ["cjs", "esm"], // Or any output format you want
  outdir: "dist", // Output directory
  clean: true,
  dts: true,
});
