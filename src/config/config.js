module.exports = {
  mode: process.env.NODE_ENV,
  authSecret: process.env.APP_SECRET,
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
  }
};
