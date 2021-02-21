import express from "express";

import routes from "./routes";

const app = express();
const port = 3333;
const baseURL = `http://localhost:${port}`;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server has started at ${baseURL}`);
});
