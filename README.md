# websocket-base-status

Enables you to monitor your websocket-base server through HTTP.

### How to use

    let base = require("websocket-base");

    base.run({
      http: require("websocket-base-status")(base)
    });

    // now you can access the status page at /

or with express

    app.get("/status", require("websocket-base-status")(base));

    base.run({
      http: app
    })

Keep in mind that it's probably a good idea to implement some security feature, you most likely don't want anyone to be able to access this page.