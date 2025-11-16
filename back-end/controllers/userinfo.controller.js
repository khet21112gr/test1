import { db } from "../db.js";

// GET /api/info/user
export const getUserInfo = async (req, res) => {
  try {
    // req.user ต้องมาจาก middleware ที่ decode JWT แล้ว
    const userRole = req.user.role;
    // console.log(userRole)
    if(userRole !== "admin"){
      return res.status(401).json({message:"Unauthorized"})
    }

    const rows = await db("SELECT * from users");

    console.log(rows[0])
    if (!rows || rows.length === 0) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    const id = rows[0].userid
    const name = rows[0].username
    const role = rows[0].role
    return res.json({
      ok: true,
      id, name , role
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
