const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.send("Admin - Home Page");
});

router.get("/:id", (request, response) => {
    const adminId = request.params.id;
    response.send(`Admin - Id: ${adminId}`);
});

router.post("/", (request, response) => {
    response.send("Admin - Create");
});

router.put("/:id", (request, response) => {
    const adminId = request.params.id;
    response.send(`Admin - Id: ${adminId} Update`);
});

module.exports = router;