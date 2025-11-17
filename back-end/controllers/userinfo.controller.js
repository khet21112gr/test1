import { db } from "../db.js";

// GET /api/info/user
export const getUserInfo = async (req, res) => {
  try {
    // req.user ต้องมาจาก middleware ที่ decode JWT แล้ว
    const userRole = req.user.role;
    if(userRole !== "admin"){
      return res.status(401).json({message:"Unauthorized"})
    }

    const rows = await db("SELECT * from users");
    

    if (!rows || rows.length === 0) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    return res.status(201).json({
      ok: true,
      rows
  
    });

  } catch (err) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
