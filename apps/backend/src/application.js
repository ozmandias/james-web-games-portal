import express from "express";
import user_router from "./api/users.js";
import game_router from "./api/games.js";
import release_router from "./api/releases.js";
import distribution_router from "./api/distributions.js";
import data_router from "./api/data.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const application = express();
const port = 8000;

application.use(express.json());
application.use(express.text());
application.use(express.urlencoded({extended: true}));

application.get("/", (request, response) => {
    response.send("James Web Games Portal Backend");
});

application.use("/users", user_router);
application.use("/games", game_router);
application.use("/releases", release_router);
application.use("/distributions", distribution_router);
application.use("/data", data_router);

// Swagger UI
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'James Web Games Portal - Backend',
      version: '1.0.0',
    },
  },
  apis: ['./src/*.js'], // files containing annotations as above
};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsDoc(swaggerOptions);
application.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

application.listen(port, () => {
    console.log(`Backend listening on port: ${port}`);
});