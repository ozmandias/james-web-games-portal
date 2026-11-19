import express from "express";

let users;

const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
router.get("/", (request, response) => {
    response.send("Users - Home Page");
});

router.get("/:id", (request, response) => {
    const gameId = request.params.id;
    response.send(`Users - Id: ${gameId}`);
});

router.post("/", (request, response) => {
    response.send("Users - Create");
});

router.put("/:id", (request, response) => {
    const gameId = request.params.id;
    response.send(`Users - Id: ${gameId} Update`);
});

// module.exports = router;
export default users = router;