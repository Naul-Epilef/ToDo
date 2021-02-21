import express from "express";

const routes = express();

routes.get("/", (request, response) => {
  response.json({ message: "tasks!" });
});

export default routes;
