const express = require("express");
const application = express();
const port = 8000;

application.get("/", (request, response) => {
    response.send("James Web Games Portal Backend");
});

const users = require("./users");
application.use("/users", users);

const games = require("./games");
application.use("/games", games);

application.listen(port, () => {
    console.log(`Backend listening on port: ${port}`);
});