module.exports = {
  apps : [{
    name   : "mofjs-wa-reminder",
    script : "deno task start",
    exec_mode: 'fork',
    cron_restart: "30 0,10 * * 1-5",
    instances: 1,
    watch: false,
    autorestart: false
  }]
}

