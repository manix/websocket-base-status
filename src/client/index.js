module = {};

window.onload = function () {
  document.getElementById("date").innerHTML = new Date().toLocaleString();

  fetch("?route=stats").then(response => response.json()).then(json => {
    const JSONFormatter = module.exports.default;
    const formatter = new JSONFormatter(json.users);

    document.body.appendChild(formatter.render());

    document.getElementById("connections").innerHTML = json.connections;
    document.getElementById("users").innerHTML = Object.keys(json.users).length;
  })
}