import { Router } from "express";
import { register ,login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/jwtauth.js";

const router = Router();

router.post("/register", register);
router.post("/login",login)
// router.get("/profile", verifyToken, getProfile);

export default router;
