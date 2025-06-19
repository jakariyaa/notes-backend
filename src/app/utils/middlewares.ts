import { NextFunction, Request, Response } from "express";

export function unknownEndpoint(req: Request, res: Response) {
  res.status(404).json({ error: "Unknown endpoint reached" });
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err.name, err.message);
  if (err.name === "MongooseError" || err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
    return;
  }
  res.status(500).json({
    message: "Something went wrong in the server. Contact the admin.",
  });
}
