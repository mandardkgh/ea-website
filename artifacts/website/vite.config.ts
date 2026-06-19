import { defineConfig } from "vite";
import path from "path";
import { execSync } from "child_process";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const port = Number(process.env.PORT) || 3000;
const basePath = process.env.BASE_PATH || "/";

const buildDate = new Date().toISOString().split("T")[0];
const gitCommit = (() => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
})();

export default defineConfig({
  base: basePath,
  plugins: [
    runtimeErrorOverlay(),
    {
      name: "html-build-info",
      transformIndexHtml(html) {
        return html
          .replace("__BUILD_DATE__", buildDate)
          .replace("__GIT_COMMIT__", gitCommit);
      },
    },
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  root: path.resolve(import.meta.dirname),
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
    __GIT_COMMIT__: JSON.stringify(gitCommit),
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
