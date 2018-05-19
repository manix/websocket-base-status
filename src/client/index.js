const toggle = function (event) {
  this.classList.toggle("expanded");

  event.stopPropagation();
}

const construct = function (data) {
  if (Array.isArray(data)) {
    const table = document.createElement("table");
    table.classList.add("expanded", "array");

    data.forEach(entry => {
      const row = document.createElement("tr");
      const col = document.createElement("td");

      col.appendChild(construct(entry));
      row.appendChild(col);
      table.appendChild(row);
    });

    return table;
  } else if (typeof data === "object") {
    const table = document.createElement("table");
    table.onclick = toggle;

    for (let key in data) {
      const row = document.createElement("tr");
      const col1 = document.createElement("td");
      const col2 = document.createElement("td");

      col1.innerHTML = key;
      col2.appendChild(construct(data[key]));
      row.appendChild(col1);
      row.appendChild(col2);
      table.appendChild(row);
    }

    return table;
  } else {
    return document.createTextNode(data);
  }
}

window.onload = function () {
  document.getElementById("date").innerHTML = new Date().toLocaleString();

  fetch("?route=stats", {
    credentials: "same-origin"
  }).then(response => response.json()).then(json => {
    document.getElementById("uptime").innerHTML = json.uptime;

    document.getElementById("users-connections").innerHTML = json.connections;
    document.getElementById("users-total").innerHTML = Object.keys(json.users).length;

    const used = json.memory;
    for (let key in used) {
      document.getElementById("mem-" + key).innerHTML = `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`;
    }

    for (let key in json.processor) {
      document.getElementById("cpu-" + key).innerHTML = json.processor[key];
    }

    document.getElementById("table").appendChild(construct(json.users));
  });
}