const { mode, server } = require('./config/config');
const fs = require('fs');
const https = require('https');
const http = require('http');
const app = require('./app');

// const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
// const certificate = fs.readFileSync("sslcert/server.crt", "utf8");
// const credentials = { key: privateKey, cert: certificate };

http.createServer(app).listen(server.port || 3030, () => {
  console.info(
    `Server Backend running http in ${mode} on Port: ${server.port}.`
  );
});

// https
//   .createServer(credentials, app)
//   .listen(server.port || 3030, server.host, () => {
//     console.info(
//       `Server Backend running https in ${mode} on Host: ${server.host} Port: ${server.port}.`
//     );
//   });

process.on('SIGINT', function () {
  console.log('Server Backend ended.');
  process.exit();
});
