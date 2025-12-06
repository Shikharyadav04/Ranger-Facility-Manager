import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import reqRouter from "./routes/req.routes.js";

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

<<<<<<< HEAD
=======
app.use("/api/auth",authRoutes)
app.use("/api/problem" , reqRouter );
>>>>>>> e05b904ee76b0567234e8489c95dc78fe5185d0a

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
