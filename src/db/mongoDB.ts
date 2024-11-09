import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../server";

dotenv.config();

mongoose.set("strictQuery", true);

const url = `${process.env.MONGO_URL_DB}`;
const port = process.env.PORT;

const startDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(url);
    app.listen(port);
    console.log("MongoDb conectado e iniciado na porta", port);
  } catch (err) {
    console.log("Erro ao conectar banco de dados", err);
  }
};

export { startDB };
