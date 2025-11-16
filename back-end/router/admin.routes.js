import { Router } from "express";
import { loginAdmin } from "../controllers/admin.auth.controller.js";

const router = Router();

router.post("/admin",loginAdmin)

export default router