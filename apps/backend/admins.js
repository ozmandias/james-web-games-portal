const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.send("Admins - Home Page");
});

router.get("/:id", (request, response) => {
    const adminId = request.params.id;
    response.send(`Admins - Id: ${adminId}`);
});

router.post("/", (request, response) => {
    response.send("Admins - Create");
});

router.put("/:id", (request, response) => {
    const adminId = request.params.id;
    response.send(`Admins - Id: ${adminId} Update`);
});

module.exports = router;