import express from "express";
import "reflect-metadata";

import db from "./config/database";
import routes from "./routes";

const validateConnection = () => {
  db.then((t) => {
    const app = express();
    const port = 3333;
    const baseURL = `http://localhost:${port}`;

    app.use(express.json());
    app.use(routes);

    app.listen(port, () => {
      console.log(`Server has started at ${baseURL}`);
    });
  }).catch((err) => {
    console.error(err);
  });
};

validateConnection();
