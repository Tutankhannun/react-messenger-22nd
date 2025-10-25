import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  // resolve: {
  //   alias: {
  //     "@": path.resolve("react-messenger", "./src"),
  //     "@assets": path.resolve("react-messenger", "./src/assets"),
  //     "@components": path.resolve("react-messenger", "./src/components"),
  //     "@pages": path.resolve("react-messenger", "./src/pages"),
  //     "@styles": path.resolve("react-messenger", "./src/styles"),
  //     "@type": path.resolve("react-messenger", "./src/types"),
  //     "@views": path.resolve("react-messenger", "./src/views"),
  //   },
  // },
});
