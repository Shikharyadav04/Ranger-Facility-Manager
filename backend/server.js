import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

//admin user seed
import { userRegister } from "./userSeed.js";

import authRoutes from "./routes/auth.routes.js";
import { connectDb } from "./database/connectDb.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  cors({
    origin: "*", // later to frontend domain
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("Facility Ops Backend Running 🚀");
});

app.use("/api/auth", authRoutes);


connectDb()
  .then(async () => {

    await userRegister();

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("❌ Database connection failed:", err);
  });
