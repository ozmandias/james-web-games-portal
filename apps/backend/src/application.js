import express from "express";
import users from "./users.js";
import games from "./games.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const application = express();
const port = 8000;

application.get("/", (request, response) => {
    response.send("James Web Games Portal Backend");
});

application.use("/users", users);
application.use("/games", games);

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