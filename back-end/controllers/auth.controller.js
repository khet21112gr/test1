import { db } from "../db.js"
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body

        // Check missing fields
        if (!username || !password || !role) {
            return res.status(400).json({ ok: false, message: "bad request, data is required" })
        }


        const data = await db(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [username, password, role]
        )

        return res.status(200).json({ ok: true, message: "success" })

    } catch (err) {
        console.error("[REGISTER ERROR]", err)
        return res.status(500).json({ ok: false, message: "internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        if (!username || !password) {
            return res.status(400).json({ ok: false, message: "bad request , data is required" });
        }

        const data = await db("SELECT * FROM users WHERE username = ?", [username]);
        console.log(data[0].password)


        if (data[0].password !== password) {
            return res.status(401).json({ ok: false, message: "wrong password" });
        }
        
        const role = data[0].role
        const token = jwt.sign(
            {
                id: data[0].userid,
                username: data[0].username,
                role: data[0].role
            },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        return res.status(200).json({
            ok: true,
            message: "login success",
            token, role
        });

    } catch (err) {
        return res.status(500).json({ ok: false, message: "internal server error" });
    }
};
