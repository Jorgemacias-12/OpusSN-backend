module.exports = {
  apps: [
    {
      name: "Opussn backend",
      script: "build/server.js",
      instances: 1,
      max_memory_restart: "2048M",

      out_file: "./out.log",
      error_file: "./error.log",
      merge_logs: true,
      log_date_format: "DD-MM-YYYY HH:mm:ss Z",
      log_type: "json",

      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      }
    }
  ]
}