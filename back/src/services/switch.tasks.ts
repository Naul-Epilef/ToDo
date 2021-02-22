import { getRepository } from "typeorm";

import Task from "../models/task";

interface Request {
  id: string;
}

class SwitchTask {
  public async execute({ id }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);

    const task = (await taskRepository.findOne(id)) as Task;

    task.Done = !task.Done;

    await taskRepository.save(task);

    return task;
  }
}

export default SwitchTask;
