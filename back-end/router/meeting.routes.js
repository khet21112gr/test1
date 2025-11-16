import { Router } from "express";
import { verifyToken } from "../middlewares/jwtauth.js";
import { createMeeting } from "../controllers/create.meeting.controller.js";

const router = Router()

router.psot('/create' , verifyToken ,createMeeting )
export default router;