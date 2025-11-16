import { db } from "../db.js"
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET;
export const loginAdmin = async (req,res) => {
    try {
        const { adminname, password } = req.body
        if (!adminname || !password) {
            return res.status(400).json({ message: 'bad request' })
        }
        const result = await db("SELECT * FROM admin where adminname = ? AND password = ?",[
            adminname , password
        ])
        if (!result){
            return res.status(401).json({message:"unauthorized"})

        }
        const id = result[0].adminid
        const role = result[0].role
        console.log(role)
        const admintoken = jwt.sign({id:id , adminname:adminname ,role:role},JWT_SECRET,{expiresIn:"3hr"})
        return res.status(200).json({ok:true, message:"Logged in as ADMIN",token:admintoken})
    }catch(err){
     return res.status(500).json({message:"internal server error"})
    }   

}