const fs = require("fs");
const JSON = require("circular-json");

module.exports = function (base) {
  return function (req, res) {
    switch (req.query.route) {
      case "file":
        sendFile(req.query.file, res);
        break;

      case "stats":
        res.send(JSON.stringify({
          connections: Object.keys(base.clients.all()).length,
          users: base.users.all()
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