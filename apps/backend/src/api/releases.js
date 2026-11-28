import express, { request } from "express";
import { releases } from "../db/schema.js";
import { makeAPIData } from "../../helpers/api_helpers.js";
import { create_and_select, delete_and_select, select, select_pagination, update_and_select } from "../../helpers/db_helpers.js";

let release_router;
const router = express.Router();

class ReleaseData {
    constructor(gameId, version, name) {
        this.gameId = gameId;
        this.version = version;
        this.name = name;
    }
}

router.get("/", async (request, response) => {
    const limit = await request.params.size || 10;
    const offset = await request.params.page || 0;
    const releaseList = await get_releases_pagination(limit, offset);
    response.send(makeAPIData(releaseList));
});

router.get("/:id", async (request, response) => {
    const releaseId = await request.params.id;
    const releaseDetails = await get_release(releaseId);
    response.send(makeAPIData(releaseDetails));
});

router.post("/", async (request, response) => {
    const releaseData = await request.body;
    const releaseDetails = await create_release(releaseData);
    response.send(makeAPIData(releaseDetails));
});

router.put("/:id", async (request, response) => {
    const releaseId = await request.params.id;
    const releaseData = await request.body;
    const releaseDetails = await update_release(releaseId, releaseData);
    response.send(makeAPIData(releaseDetails));
});

router.delete("/:id", async (request, response) => {
    const releaseId = await request.params.id;
    const releaseDetails = await delete_release(releaseId);
    response.send(makeAPIData(releaseDetails));
});

export default release_router = router;

/* --------------------------------------------------------------------------------------- */

export async function get_releases_pagination(limit, offset) {
    return await select_pagination(releases, null, null, null, "desc", limit, offset);
}

export async function get_release(id) {
    return await select(releases, id);
}

export async function create_release(releaseData) {
    return await create_and_select(releases, releaseData);
}

export async function update_release(id, releaseData) {
    return await update_and_select(releases, id, releaseData);
}

export async function delete_release(id) {    
    return await delete_and_select(releases, id);
}