import { db } from "../db.js"

export const deleteUser = async  (req, res) => {

    try {
        const userRole = req.user.role
        const { id } = req.params
        if (userRole !== "admin") {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const deleted = await db('DELETE FROM users WHERE userid = ?',
            [id]
        )
        return res.status(201).json({ok:true, message: "success" })
    } catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }

}

export const editUser = async (req,res) =>{
    const { id } = req.params
    const userRole = req.user.role
    try{
        if(!id){
            return res.status(400).json({message:"bad request"})
        }
        if(userRole !== "admin"){
            return res.status(401).json({message:"Unauthorized"})
        }
    }catch(err){
        return res.status(500).json({message:"internal server error"})
    }

}

export const fetchdata = async (req,res) => {
    const  { id } = req.user.id
    console.log(id)
    return res.status(200).json({ok:true , message:'success'})
} 