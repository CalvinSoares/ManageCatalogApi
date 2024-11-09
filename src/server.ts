import express from "express";
import { startDB } from "./db/mongoDB";
import cors from "cors";
import userRouter from "./routes/UserRoutes";

const app = express();

app.use(express.urlencoded({ limit: "90mb", extended: true }));
app.use(cors());
app.use(express.json({ limit: "90mb" }));
app.use(userRouter);

startDB();

export default app;
