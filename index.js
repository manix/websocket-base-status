const fs = require("fs");
const JSON = require("circular-json");
const ua = require("ua-parser-js");

let config = {};

config.parseUser = user => user;
config.parseConnection = connection => ({
  id: connection.id,
  bytesReceived: connection.bytesReceived,
  device: ua(connection.upgradeReq.headers["user-agent"])
});

module.exports = function (base, _config = {}) {
  config = Object.assign(config, _config);

  return function (req, res) {
    switch (req.query.route) {
      case "style":
        res.set('Content-Type', 'text/css');
        // intentionally omit break, send file below
      case "file":
        sendFile(req.query.file, res);
        break;

      case "stats":
        res.send(JSON.stringify({
          connections: Object.keys(base.clients.all()).length,
          users: Object.entries(base.users.all()).map(([id, user]) => {
            let copy = config.parseUser(Object.assign({}, user));

            copy.connections = Object.entries(user.connections).map(([id, connection]) => {
              return config.parseConnection(Object.assign({}, connection));
            });

            return copy;
          }),
          memory: process.memoryUsage(),
          processor: process.cpuUsage(),
          uptime: process.uptime()
        }))
        break;

      default:
        sendFile("index.html", res);
        break;
    }
  }
}

function sendFile(file, res) {
  res.send(fs.readFileSync(__dirname + "/src/client/" + file.replace("/", "")).toString());
}