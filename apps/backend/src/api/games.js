import express, { request } from "express";
import db from "../db/database.js";
import { games } from "../db/schema.js";
import { desc, eq } from "drizzle-orm";
import { makeAPIData } from "../helpers/api_helpers.js";

let game_router;

const router = express.Router();

router.get("/", async (request, response) => {
    const offset = await request.params.page || 0;
    const limit = await request.params.size || 10;
    const gameList = await db.select().from(games).where(eq(games.active, true)).orderBy(desc(games.id)).limit(limit).offset(offset);
    response.send(makeAPIData(gameList));
});

router.get("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameDetails = await db.select().from(games).where(eq(games.id, gameId)).then((data) => {return data[0]});
    response.send(makeAPIData(gameDetails));
});

router.post("/", async (request, response) => {
    const gameData = await request.body;
    const gameCreate = await db.insert(games).values(gameData).then((data) => {return data[0]});
    response.send(makeAPIData(gameCreate));
});
/*{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 2,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
}*/

router.put("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameData = await request.body;
    const gameUpdate = await db.update(games).set(gameData).where(eq(games.id, gameId)).then((data) => {return data[0]});
    response.send(makeAPIData(gameUpdate));
});
/*{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
}*/

router.delete("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameDelete = await db.delete(games).where(eq(games.id, gameId)).then((data) => {return data[0]});
    response.send(makeAPIData(gameDelete));
});
/*{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
}*/

// module.exports = router;
export default game_router = router;