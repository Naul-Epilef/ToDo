import { getRepository } from "typeorm";

import Task from "../models/task";

interface Request {
  id: string;
  Title: string;
}

class EditTask {
  public async execute({ id, Title }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);

    const task = (await taskRepository.findOne(id)) as Task;

    task.Title = Title;

    await taskRepository.save(task);

    return task;
  }
}

export default EditTask;
