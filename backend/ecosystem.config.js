module.exports = {
  apps: [{
    name: "API",
    script: "./dist/index.js",
    instances: 1,
    exec_mode: "cluster",
    watch: ["dist"],
    ignore_watch: ["node_modules"],
    watch_options: {
      usePolling: true,
      interval: 1000
    }
  }
  ]
}
