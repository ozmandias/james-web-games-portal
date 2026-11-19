import express from "express";
import users from "./users.js";
import games from "./games.js";

const application = express();
const port = 8000;

application.get("/", (request, response) => {
    response.send("James Web Games Portal Backend");
});

application.use("/users", users);
application.use("/games", games);

application.listen(port, () => {
    console.log(`Backend listening on port: ${port}`);
});