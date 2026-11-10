const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.send("Games - Home Page");
});

router.get("/:id", (request, response) => {
    const gameId = request.params.id;
    response.send(`Games - Id: ${gameId}`);
});

router.post("/", (request, response) => {
    response.send("Games - Create");
});

router.put("/:id", (request, response) => {
    const gameId = request.params.id;
    response.send(`Games - Id: ${gameId} Update`);
});

module.exports = router;