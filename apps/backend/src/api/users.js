import express from "express";
import db from "../db/database.js";
import { users } from "../db/schema.js";
import { desc, eq } from "drizzle-orm";
import { makeAPIData } from "../helpers/api_helpers.js";

let user_router;

const router = express.Router();

router.get("/", async (request, response) => {
    const offset = await request.params.page || 0;
    const limit = await request.params.size || 10;
    const userList = await db.select().from(users).where(eq(users.active, true)).orderBy(desc(users.id)).limit(limit).offset(offset);
    response.send(makeAPIData(userList));
});

router.get("/:id", async (request, response) => {
    const userId = await request.params.id;
    const userDetails = await db.select().from(users).where(eq(users.id, userId));
    response.send(makeAPIData(userDetails));
});

router.post("/", async (request, response) => {
    const userData = await request.body;
    const userCreate = await db.insert(users).values(userData).then((data) => {return data[0]});
    response.send(makeAPIData(userCreate));
});

router.put("/:id", async (request, response) => {
    const userId = await request.params.id;
    const userData = await request.body;
    const userUpdate = await db.update(users).set(userData).where(eq(users.id, userId)).then((data) => {return data[0]});
    response.send(makeAPIData(userUpdate));
});

router.delete("/:id", async (request, response) => {
    const userId = await request.params.id;
    const userDelete = await db.delete(users).where(eq(users.id, userId)).then((data) => {return data[0]});
    response.send(makeAPIData(userDelete));
});

// module.exports = router;
export default user_router = router;