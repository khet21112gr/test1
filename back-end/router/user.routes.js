import { Router } from "express";
import { verifyToken } from "../middlewares/jwtauth.js";
import { getUserInfo } from "../controllers/userinfo.controller.js"
import { deleteUser } from "../controllers/user.controller.js"; 
import { fetchdata } from "../controllers/user.controller.js";

const router = Router()
router.delete('/delete/:id' ,verifyToken,deleteUser )
router.get('/user' , verifyToken ,getUserInfo)
router.get('/data',verifyToken,fetchdata)
export default router;