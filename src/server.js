const app = require("./app");
const { mode, server } = require("../.env");

app.listen(server.port || 3030, server.host, () => {
  console.log(
    `Server Backend running in ${mode} on Host: ${server.host} Port: ${server.port}.`
  );
});
