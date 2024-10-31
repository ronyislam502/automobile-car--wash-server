import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1");

const getController = (req: Request, res: Response) => {
  res.send("AutoMobile(car)-wash");
};

app.get("/", getController);

export default app;
