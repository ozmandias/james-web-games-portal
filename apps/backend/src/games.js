import express, { request } from "express";
import db from "./db/database.js";
import { games } from "./db/schema.js";
import { desc, eq } from "drizzle-orm";

let game_router;

const router = express.Router();

router.get("/", async (request, response) => {
    const gameList = await db.select().from(games).where(eq(games.active, true)).orderBy(desc(games.id)).limit(10).offset(0);
    console.log("gameList: ", gameList);
    response.send(gameList);
});

router.get("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameDetails = await db.select().from(games).where(eq(games.id, gameId)).then((data) => {return data[0]});
    console.log("gameDetails: ", gameDetails);
    response.send(gameDetails);
});

router.post("/", async (request, response) => {
    const gameData = await request.body();
    const gameDetails = await db.insert(games).values(gameData).then((data) => {return data[0]});
    console.log("gameDetails: ", gameDetails);
    response.send(gameDetails);
});

router.put("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameData = await request.body();
    const gameDetails = await db.update(games).set(gameData).where(eq(games.id, gameId)).then((data) => {return data[0]});
    console.log("gameDetails: ", gameDetails);
    response.send(gameDetails);
});

router.delete("/:id", async (request, response) => {
    const gameId = await request.params.id;
    await db.delete(games).where(eq(games.id, gameId));
    response.send("successfully deleted game - id: " + gameId);
});

// module.exports = router;
export default game_router = router;