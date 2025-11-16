import { db } from "../db.js"
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body

        // Check missing fields
        if (!email || !password || !role) {
            return res.status(400).json({ ok: false, message: "bad request, data is required" })
        }

        // Check duplicate email
        const checkDub = await db("SELECT * FROM users WHERE email = ?", [email])

        if (checkDub.length > 0) {
            return res.status(409).json({ ok: false, message: "this email is already taken" })
        }

        // Insert new user
        const data = await db(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [email, password, role]
        )

        return res.status(200).json({ ok: true, message: "success" })

    } catch (err) {
        console.error("[REGISTER ERROR]", err)
        return res.status(500).json({ ok: false, message: "internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({ ok: false, message: "bad request , data is required" });
        }

        const data = await db("SELECT * FROM users WHERE email = ?", [email]);
        console.log(data[0].password)


        if (data[0].password !== password) {
            return res.status(401).json({ ok: false, message: "wrong password" });
        }
 
        const token = jwt.sign(
            {
                id: data[0].userid,
                email: data[0].email,
                role: data[0].role
            },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        return res.status(200).json({
            ok: true,
            message: "login success",
            token
        });

    } catch (err) {
        return res.status(500).json({ ok: false, message: "internal server error" });
    }
};
