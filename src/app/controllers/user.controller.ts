import { Request, Response, Router } from "express";
import User from "../models/user.model";

const usersRouter = Router();
export default usersRouter;

usersRouter.get("/", async (req: Request, res: Response) => {
  const users = await User.find().sort({ name: "asc" });
  res.json(users);
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  user.set(req.body);
  await user.save();
  res.json(user);
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});
