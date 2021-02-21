import express from "express";

import tasks from "./tasks.routes";

const routes = express();

routes.use("/tasks", tasks);

export default routes;
