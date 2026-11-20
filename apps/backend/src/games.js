import express from "express";
import db from "./db/database.js";
import { games } from "./db/schema.js";
import { eq } from "drizzle-orm";

let game_router;

const router = express.Router();

router.get("/", async (request, response) => {
    const game_list = await db.select().from(games).where(eq(games.active, true));
    return game_list;
});

router.get("/:id", async (request, response) => {
    const gameId = request.params.id;
    const game_details = await db.select().from(games).where(eq(games.id, gameId));
    return game_details;
});

router.post("/", async (request, response) => {
    const data = await request.body();
    const game_details = await db.insert(games).values(data);
    return game_details;
});

router.put("/:id", async (request, response) => {
    const gameId = request.params.id;
    const data = await request.body();
    const game_details = await db.update(games).set(data).where(eq(games.id, gameId));
    return game_details;
});

// module.exports = router;
export default game_router = router;