import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/react-v3-blended-starter/",
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
