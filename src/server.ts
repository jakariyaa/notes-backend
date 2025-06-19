import "dotenv/config";
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const port = process.env.PORT || 3000;

async function bootstrap() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB:", connection.host);
    server = app.listen(port, () =>
      console.log(`Server running on port ${port}`)
    );
  } catch (error) {
    console.log("Error starting server: \n", error);
  }
}

bootstrap();
