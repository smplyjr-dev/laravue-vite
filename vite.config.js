const path = require("path");
const vue = require("@vitejs/plugin-vue");

export default ({ command }) => ({
  base: command === "serve" ? "" : "/build/",
  publicDir: "fake_directory_so_nothing_gets_copied",
  build: {
    manifest: true,
    outDir: "public/build",
    rollupOptions: {
      input: "resources/js/app.js"
    }
  },
  plugins: [
    {
      name: "blade",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".blade.php")) {
          server.ws.send({
            type: "full-reload",
            path: "*"
          });
        }
      }
    },
    vue()
  ],
  resolve: {
    alias: {
      "@Components": path.join(__dirname, "./resources/js/components"),
      "@Node": path.join(__dirname, "./node_modules"),
      "@Public": path.join(__dirname, "./public"),
      "@Scripts": path.join(__dirname, "./resources/js"),
      "@Pages": path.join(__dirname, "./resources/js/pages"),
      "@CDT": path.join(__dirname, "./resources/js/components/datatable/client/index.js"),
      "@SDT": path.join(__dirname, "./resources/js/components/datatable/server/index.js"),
      "@Styles": path.join(__dirname, "./resources/sass")
    }
  }
});
