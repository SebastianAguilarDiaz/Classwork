import express from "express";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { AppError } from "./utils/appError.js";
import { loadEnvFile } from "node:process";
import { connectDB } from "./config/db.js";
import { createUser, findUser, findUsers } from "./services/user-service.js";

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

//Load environment variables from .env file
loadEnvFile();

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbName = "Test_db";

// const mongoUrl=`mongodb+srv://${dbuser}:${dbpassword}@cluster0.nk1sl9s.mongodb.net/${dbName}`;
const mongoUrl = `mongodb://${dbuser}:${dbpassword}@ac-cdtiaqo-shard-00-00.nk1sl9s.mongodb.net:27017,ac-cdtiaqo-shard-00-01.nk1sl9s.mongodb.net:27017,ac-cdtiaqo-shard-00-02.nk1sl9s.mongodb.net:27017/?ssl=true&replicaSet=atlas-11qq4b-shard-0&authSource=admin`;

connectDB(mongoUrl);

// TODO: Serve static files from the 'client' directory so index.html loads on http://localhost:3000
app.use(express.static("client"));

// TODO: Mount Routers
// Mount authRoutes on '/api/auth'
app.use("/api/auth", authRoutes);
// Mount apiRoutes on '/api/'
app.use("/api/initiatives", apiRoutes);

app.post("/user", (req, res, next) => {
  const { username, name, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new Error("All fieldss should be filled"));
  }
  createUser({ username, name, email, password })
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

app.post("/user", (req, res) => {});

// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
  next(
    new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404),
  );
});
app.listen(PORT, () => {
  console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});
