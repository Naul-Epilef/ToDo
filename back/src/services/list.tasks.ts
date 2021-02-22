import { getRepository } from "typeorm";

import Task from "../models/task";

class ListTask {
  public async execute(): Promise<Task[]> {
    const taskRepository = getRepository(Task);

    const tasks = (await taskRepository.find({
      order: { created_at: "ASC" },
    })) as Task[];

    return tasks;
  }
}

export default ListTask;
