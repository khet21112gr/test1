import { db } from "../db.js";

// GET /api/info/user
export const getUserInfo = async (req, res) => {
  try {
    
    const userId = req.user.id;
    const role = req.user.role;
    console.log(req.user.role)
    const rows = await db("SELECT userid, email, role FROM users WHERE userid = ?", [userId]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    const data_role = rows[0].role

    return res.json({
      ok: true,
      user: rows[0],
      data_role
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};