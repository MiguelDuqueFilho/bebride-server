const { mode, server } = require("./config/config");
const app = require("./app");

app.listen(server.port || 3030, server.host, () => {
  console.info(
    `Server Backend running in ${mode} on Host: ${server.host} Port: ${server.port}.`
  );
});
