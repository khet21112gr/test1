import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userAuthRoutes from "./router/auth.routes.js";
import userRoutes from "./router/user.routes.js"
import adminRoutes from "./router/admin.routes.js"
import meetingRoutes from "./router/meeting.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// import routes

app.use("/api/auth", userAuthRoutes);
app.use("/api/info", userRoutes)
app.use('/api', adminRoutes)
app.use('api/meeting',meetingRoutes)
// error handler
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
