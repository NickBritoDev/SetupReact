import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const resolve = (name: string) => path.resolve(__dirname, `./src/${name}/`);

export default defineConfig({
  resolve: {
    alias: {
      "@api": resolve("api"),
      "@components": resolve("components"),
      "@helpers": resolve("helpers"),
      "@layout": resolve("layout"),
      "@pages": resolve("pages"),
      "@themes": resolve("themes"),
      "@context": resolve("context"),
      "@utils": resolve("utils"),
      "@modules": resolve("modules"),
      "@hooks": resolve("hooks"),
    },
  },
  plugins: [react()],
});
