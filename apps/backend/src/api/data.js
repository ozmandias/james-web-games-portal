import express, { request } from "express";
import { data } from "../db/schema.js";
import { makeAPIData } from "../../helpers/api_helpers.js";
import { create_and_select, delete_and_select, select, select_pagination, update_and_select } from "../../helpers/db_helpers.js";

let data_router;
const router = express.Router();

class Data {
    constructor(distributionId, url, file, type) {
        this.distributionId = distributionId;
        this.url = url;
        this.file = file;
        this.type = type;
    }
}

router.get("/", async (request, response) => {
    const limit = await request.params.size || 10;
    const offset = await request.params.page || 0;
    const dataList = await get_data_pagination(limit, offset);
    response.send(makeAPIData(dataList));
});

router.get("/:id", async (request, response) => {
    const dataId = await request.params.id;
    const dataDetails = await get_data(dataId);
    response.send(makeAPIData(dataDetails));
});

router.post("/", async (request, response) => {
    const createData = await request.body;
    const dataDetails = await create_data(createData);
    response.send(makeAPIData(dataDetails));
});

router.put("/:id", async (request, response) => {
    const dataId = await request.params.id;
    const updateData = await request.body;
    const dataDetails = await update_data(dataId, updateData);
    response.send(makeAPIData(dataDetails));
});

router.delete("/:id", async (request, response) => {
    const dataId = await request.params.id;
    const dataDetails = await delete_data(dataId);
    response.send(makeAPIData(dataDetails));
});

export default data_router = router;

/* --------------------------------------------------------------------------------------- */

export async function get_data_pagination(limit, offset) {
    return await select_pagination(data, null, null, null, "desc", limit, offset);
}

export async function get_data(id) {
    return await select(data, id);
}

export async function create_data(createData) {
    return await create_and_select(data, createData);
}

export async function update_data(id, updateData) {
    return await update_and_select(data, id, updateData);
}

export async function delete_data(id) {
    return await delete_and_select(data, id);
}