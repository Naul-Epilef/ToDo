import express from "express";
import { getRepository } from "typeorm";
import { v4 } from "uuid";

import Task from "../models/task";

const routes = express();

routes.get("/", async (request, response) => {
  const taskRepository = getRepository(Task);

  const tasks = (await taskRepository.find({
    order: { created_at: "ASC" },
  })) as Task[];

  response.json(tasks);
});

routes.post("/", async (request, response) => {
  const { Title } = request.body;

  const taskRepository = getRepository(Task);

  const newTask = taskRepository.create({
    id: v4(),
    Title,
    Done: false,
  });

  await taskRepository.save(newTask);

  response.json(newTask);
});

routes.put("/switch/:id", async (request, response) => {
  const { id } = request.params;

  const taskRepository = getRepository(Task);

  const task = (await taskRepository.findOne(id)) as Task;

  task.Done = !task.Done;

  await taskRepository.save(task);

  response.json(task);
});

routes.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { Title } = request.body;

  const taskRepository = getRepository(Task);

  const task = (await taskRepository.findOne(id)) as Task;

  task.Title = Title;

  await taskRepository.save(task);

  response.json(task);
});

routes.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const taskRepository = getRepository(Task);

  await taskRepository.delete(id);

  response.json({ message: "Task deleted!" });
});

export default routes;
