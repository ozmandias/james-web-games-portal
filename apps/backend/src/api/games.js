import express, { request } from "express";
import { games } from "../db/schema.js";
import { makeAPIData } from "../../helpers/api_helpers.js";
import { create_and_select, delete_and_select, select, select_pagination, update_and_select } from "../../helpers/db_helpers.js";

let game_router;
const router = express.Router();

class GameData {
    constructor(name, platform, version, file, url, active) {
        this.name = name;
        this.platform = platform;
        this.version = version;
        this.file = file;
        this.url = url;
        this.active = active;
    }
}

router.get("/", async (request, response) => {
    const limit = await request.params.size || 10;
    const offset = await request.params.page || 0;
    const gameList = await select_pagination(games, "active", "desc", limit, offset);
    response.send(makeAPIData(gameList));
});

router.get("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameDetails = await select(games, gameId);
    response.send(makeAPIData(gameDetails));
});

router.post("/", async (request, response) => {
    const gameData = await request.body;
    const gameDetails = await create_and_select(games, gameData);
    response.send(makeAPIData(gameDetails));
});

router.put("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameData = await request.body;
    const gameDetails = await update_and_select(games, gameId, gameData);
    response.send(makeAPIData(gameDetails));
});

router.delete("/:id", async (request, response) => {
    const gameId = await request.params.id;
    const gameDetails = await delete_and_select(games, gameId);
    response.send(makeAPIData(gameDetails));
});

// module.exports = router;
export default game_router = router;

export async function get_games(limit, offset) {
    
}

export async function get_game(id) {

}

export async function create_game(gameData) {

}

export async function update_game(id, gameData) {

}

export async function delete_game(id) {

}