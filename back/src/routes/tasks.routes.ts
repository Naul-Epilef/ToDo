import express from "express";

import ListTask from "../services/list.tasks";
import CreateTask from "../services/create.tasks";
import SwitchTask from "../services/switch.tasks";
import EditTask from "../services/edit.tasks";
import DeleteTask from "../services/delete.tasks";

const routes = express();

routes.get("/", async (request, response) => {
  const tasks = await new ListTask().execute();
  response.json(tasks);
});

routes.post("/", async (request, response) => {
  const { Title } = request.body;

  const newTask = await new CreateTask().execute({ Title });

  response.json(newTask);
});

routes.put("/switch/:id", async (request, response) => {
  const { id } = request.params;

  const task = await new SwitchTask().execute({ id });

  response.json(task);
});

routes.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { Title } = request.body;

  const task = await new EditTask().execute({ id, Title });

  response.json(task);
});

routes.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const res = await new DeleteTask().execute({ id });

  response.json(res);
});

export default routes;
