import { CreateDateColumn, getRepository } from "typeorm";
import { v4 } from "uuid";

import Task from "../models/task";

interface Request {
  Title: string;
}

class CreateTask {
  public async execute({ Title }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);

    const newTask = taskRepository.create({
      id: v4(),
      Title,
      Done: false,
    });

    await taskRepository.save(newTask);

    return newTask;
  }
}

export default CreateTask;
