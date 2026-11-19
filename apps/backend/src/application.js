import express from "express";
import users from "./users.js";
import games from "./games.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const application = express();
const port = 8000;

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    myapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./*.js'], // files containing annotations as above
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
application.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

application.get("/", (request, response) => {
    response.send("James Web Games Portal Backend");
});

application.use("/users", users);
application.use("/games", games);

application.listen(port, () => {
    console.log(`Backend listening on port: ${port}`);
});