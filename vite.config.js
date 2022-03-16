import vue from "@vitejs/plugin-vue";

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
  ]
});
