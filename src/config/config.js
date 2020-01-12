module.exports = {
  mode: process.env.NODE_ENV,
  authSecret: process.env.APP_SECRET,
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  }
};
