import express, { request } from "express";
import { distributions } from "../db/schema.js";
import { makeAPIData } from "../../helpers/api_helpers.js";
import { create_and_select, delete_and_select, select, select_pagination, update_and_select } from "../../helpers/db_helpers.js";

let distribution_router;
const router = express.Router();

class DistributionData {
    constructor(releaseId, platform, runtime, distributionMode, dataMode) {
        this.releaseId = releaseId;
        this.platform = platform;
        this.runtime = runtime;
        this.distributionMode = distributionMode;
        this.dataMode = dataMode;
    }
}

router.get("/", async (request, response) => {
    const limit = await request.params.size || 10;
    const offset = await request.params.page || 0;
    const distributionList = await get_distributions_pagination(limit, offset);
    response.send(makeAPIData(distributionList));
});

router.get("/:id", async (request, response) => {
    const distributionId = await request.params.id;
    const distributionDetails = await get_distribution(distributionId);
    response.send(makeAPIData(distributionDetails));
});

router.post("/", async (request, response) => {
    const distributionData = await request.body;
    const distributionDetails = await create_distribution(distributionData);
    response.send(makeAPIData(distributionDetails));
});

router.put("/:id", async (request, response) => {
    const distributionId = await request.params.id;
    const distributionData = await request.body;
    const distributionDetails = await update_distribution(distributionId, distributionData);
    response.send(makeAPIData(distributionDetails));
});

router.delete("/:id", async (request, response) => {
    const distributionId = await request.params.id;
    const distributionDetails = await delete_distribution(distributionId);
    response.send(makeAPIData(distributionDetails));
});

export default distribution_router = router;

/* --------------------------------------------------------------------------------------- */

export async function get_distributions_pagination(limit, offset) {
    return await select_pagination(distributions, null, null, null, "desc", limit, offset);
}

export async function get_distribution(id) {
    return await select(distributions, id);
}

export async function create_distribution(distributionData) {
    return await create_and_select(distributions, distributionData);
}

export async function update_distribution(id, distributionData) {
    return await update_and_select(distributions, id, distributionData);
}

export async function delete_distribution(id) {    
    return await delete_and_select(distributions, id);
}