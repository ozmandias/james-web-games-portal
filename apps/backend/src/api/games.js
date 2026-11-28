import express, { request } from "express";
import { games } from "../db/schema.js";
import { makeAPIData } from "../../helpers/api_helpers.js";
import { create_and_select, delete_and_select, select, select_pagination, update_and_select } from "../../helpers/db_helpers.js";

let game_router;
const router = express.Router();

class GameData {
    constructor(name, description, controls,  active, images, videos) {
        this.name = name;
        this.description = description;
        this.controls = controls;
        this.active = active;
        this.create_datetime = new Date().toISOString();
        this.update_datetime = new Date().toISOString();
    }
}

router.get("/", async (request, response) => {
    const limit = await request.params.size || 10;
    const offset = await request.params.page || 0;
    const gameList = await get_games_pagination(limit, offset);
    response.send(makeAPIData(gameList));
});

router.get("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameDetails = await get_game(gameId);
    response.send(makeAPIData(gameDetails));
});

router.post("/", async (request, response) => {
    const gameData = await request.body;
    const gameDetails = await create_game(gameData);
    response.send(makeAPIData(gameDetails));
});

router.put("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameData = await request.body;
    const gameDetails = await update_game(gameId, gameData);
    response.send(makeAPIData(gameDetails));
});

router.delete("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameDetails = await delete_game(gameId);
    response.send(makeAPIData(gameDetails));
});

// module.exports = router;
export default game_router = router;

/* --------------------------------------------------------------------------------------- */

export async function get_games_pagination(limit, offset) {
    return await select_pagination(games, "active", "equal", true, "desc", limit, offset);
}

export async function get_game(id) {
    return await select(games, id);
}

export async function create_game(gameData) {
    return await create_and_select(games, gameData);
}

export async function update_game(id, gameData) {
    return await update_and_select(games, id, gameData);
}

export async function delete_game(id) {
    return await delete_and_select(games, id);
}