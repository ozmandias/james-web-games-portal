import express from "express";
import { users } from "../db/schema.js";
import { makeAPIData } from "../../helpers/api_helpers.js";
import { create_and_select, delete_and_select, select, select_pagination, update_and_select } from "../../helpers/db_helpers.js";

let user_router;
const router = express.Router();

router.get("/", async (request, response) => {
    const limit = await request.params.size || 10;
    const offset = await request.params.page || 0;
    const userList = await get_users_pagination(limit, offset);
    response.send(makeAPIData(userList));
});

router.get("/:id", async (request, response) => {
    const userId = await request.params.id;
    const userDetails = await get_user(userId);
    response.send(makeAPIData(userDetails));
});

router.post("/", async (request, response) => {
    const userData = await request.body;
    const userDetails = await create_user(userData);
    response.send(makeAPIData(userDetails));
});

router.put("/:id", async (request, response) => {
    const userId = await request.params.id;
    const userData = await request.body;
    const userDetails = await update_user(userId, userData);
    response.send(makeAPIData(userDetails));
});

router.delete("/:id", async (request, response) => {
    const userId = await request.params.id;
    const userDetails = await delete_user(userId);
    response.send(makeAPIData(userDetails));
});

// module.exports = router;
export default user_router = router;

/* --------------------------------------------------------------------------------------- */

export async function get_users_pagination(limit, offset) {
    return await select_pagination(users, "active", "equal", true, "desc", limit, offset);
}

export async function get_user(id) {
    return await select(users, id);
}

export async function create_user(userData) {
    return await create_and_select(users, userData);
}

export async function update_user(id, userData) {
    return await update_and_select(users, id, userData);
}

export async function delete_user(id) {
    return await delete_and_select(users, id);
}