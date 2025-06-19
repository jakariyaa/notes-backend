import { Request, Response, Router } from "express";
import Note from "../models/note.model";

const notesRouter = Router();
export default notesRouter;

notesRouter.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user", { name: 1 });
  res.json(notes);
});

notesRouter.get("/search", async (req: Request, res: Response) => {
  const notes = await Note.find({
    $or: [
      { title: { $regex: req.query.q, $options: "i" } },
      { content: { $regex: req.query.q, $options: "i" } },
    ],
  }).populate("user", { name: 1 });
  res.json(notes);
});

notesRouter.get("/:id", async (req: Request, res: Response) => {
  const note = await Note.findById(req.params.id).populate("user");
  res.json(note);
});

notesRouter.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  const note = await Note.create(req.body);
  res.json(note);
});

notesRouter.put("/:id", async (req: Request, res: Response) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(note);
});

notesRouter.delete("/:id", async (req: Request, res: Response) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  res.json(note);
});
