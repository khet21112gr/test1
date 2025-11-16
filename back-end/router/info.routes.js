import { Router } from "express";
import { verifyToken } from "../middlewares/jwtauth.js";
import { getUserInfo } from "../controllers/userinfo.controller.js"

const router = Router()

router.get('/user' , verifyToken ,getUserInfo)
export default router;