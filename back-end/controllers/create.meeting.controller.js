import { db } from "../db.js"; // mysql2 connection

// POST /api/meeting
export const createMeeting = async (req, res) => {
  try {
    const { mtname, desc, date } = req.body;

    if (!mtname || !date) {
      return res.status(400).json({ ok: false, message: "Meeting name and date are required" });
    }

    // insert meeting
    const result = await db(
      "INSERT INTO meeting (mtname, `desc`, date, state) VALUES (?, ?, ?, ?)",
      [mtname, desc || '', date, 'scheduled'] // state default scheduled
    );

    const meetingId = result.insertId;

    return res.json({ ok: true, message: "Meeting created", meetingId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
