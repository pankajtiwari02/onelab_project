import express from "express";
import authRouter from "./router/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => {
      console.log("MongoDB Successfully Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const logger = (req, res, next) => {
  console.log(req.url);
  next();
};

var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};


app.use(cors(corsOptions));

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went wrong";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
  connectMongoDB();
});
