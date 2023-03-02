import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";

const PORT = 5000;
const MONGO_DB_URL =
  "mongodb+srv://username:simple-password@mycluster.7uy4jc6.mongodb.net/?retryWrites=true&w=majority";

var corsOptions = {
  origin: "https://sobes-topics.vercel.app/",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(express.urlencoded());
mongoose.set("strictQuery", false);

const startApp = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
    app.listen(PORT, () => {
      console.log("SERVER STARTED ON PORT: ", PORT);
    });
  } catch (e) {
    console.error(e);
  }
};

startApp();
