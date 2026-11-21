import express from "express";
import db from "./db/database.js";
import { users } from "./db/schema.js";
import { desc, eq } from "drizzle-orm";

let user_router;

const router = express.Router();

router.get("/", async (request, response) => {
    const userList = await db.select().from(users).where(eq(users.active, true)).orderBy(desc(users.id)).limit(10).offset(0);
    console.log("userList: ", userList);
    response.send(userList);
});

router.get("/:id", async (request, response) => {
    const userId = await request.params.id;
    const userDetails = await db.select().from(users).where(eq(users.id, userId));
    console.log("userDetails: ", userDetails);
    response.send(userDetails);
});

router.post("/", async (request, response) => {
    const userData = await request.body();
    const userDetails = await db.insert(users).values(userData).then((data) => {return data[0]});
    console.log("userDetails: ", userDetails);
    response.send(userDetails);
});

router.put("/:id", async (request, response) => {
    const userId = await request.params.id;
    const userData = await request.body();
    const userDetails = await db.update(users).set(userData).where(eq(users.id, userId)).then((data) => {return data[0]});
    console.log("userDetails: ", userDetails);
    response.send(userDetails);
});

router.delete("/:id", async (request, response) => {
    const userId = await request.params.id;
    await db.delete(users).where(eq(users.id, userId));
    response.send("successfully deleted user - id: " + userId);
});

// module.exports = router;
export default user_router = router;