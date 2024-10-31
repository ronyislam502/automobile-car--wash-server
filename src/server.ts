import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "http";

let server: Server;
const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`AutoMobile(car)-wash app listening on port: ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

process.on("unhandledRejection", () => {
  if (server) {
    console.log("unhandledRejection is deleted, shutting down");
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", () => {
  console.log("uncaughtException is deleted, shutting down");
  process.exit(1);
});
