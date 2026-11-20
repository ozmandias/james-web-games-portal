import express from "express";

let user_router;

const router = express.Router();

router.get("/", (request, response) => {
    response.send("Users - Home Page");
});

router.get("/:id", (request, response) => {
    const gameId = request.params.id;
    response.send(`Users - Id: ${gameId}`);
});

router.post("/", (request, response) => {
    response.send("Users - Create");
});

router.put("/:id", (request, response) => {
    const gameId = request.params.id;
    response.send(`Users - Id: ${gameId} Update`);
});

// module.exports = router;
export default user_router = router;