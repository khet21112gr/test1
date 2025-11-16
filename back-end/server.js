import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./router/auth.routes.js";
import infoRoutes from "./router/info.routes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// import routes

app.use("/api/auth", userRoutes);
app.use("/api/info",  infoRoutes)


// error handler
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
