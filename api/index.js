import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import cakeRoute from "./routes/cake.route.js";
import sweetRoute from "./routes/sweet.route.js";
import searchRoute from "./routes/search.route.js";
import pushTokenRoute from "./routes/pushtoken.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mobila App Successfully Connected to OBCake MongoDB Database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cookieParser());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is Running on Port 3000");
});

const corsOptions = {
  origin: "",
  credentials: true,
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.get("/test", (req, res) => {
  return res.json({ message: "Test Route is Working" });
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/cakes", cakeRoute);
app.use("/sweets", sweetRoute);
app.use("/search", searchRoute);
app.use("/pushToken", pushTokenRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
