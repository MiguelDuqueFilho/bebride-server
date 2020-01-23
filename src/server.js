const { mode, server, client } = require("./config/config");
const app = require("./app");

app.listen(server.port || 3030, server.host, () => {
  console.log(
    `Server Backend running in ${mode} on Host: ${server.host} Port: ${server.port}.`
  );
  console.log(`Restrict the Allowed Host ${client.host}`);
});
