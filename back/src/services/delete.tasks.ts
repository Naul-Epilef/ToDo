import { getRepository } from "typeorm";

import Task from "../models/task";

interface Request {
  id: string;
}

interface Response {
  message: string;
}

class DeleteTask {
  public async execute({ id }: Request): Promise<Response> {
    const taskRepository = getRepository(Task);

    await taskRepository.delete(id);

    const response = {
      message: "Task deleted!",
    };

    return response;
  }
}

export default DeleteTask;
