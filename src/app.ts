import express, { Application, Request, Response, NextFunction } from "express";
import notesRouter from "./app/controllers/note.controller";
import usersRouter from "./app/controllers/user.controller";
import { errorHandler, unknownEndpoint } from "./app/utils/middlewares";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
