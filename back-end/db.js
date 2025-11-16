import mariadb from 'mariadb'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, './.env') })

export const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  connectionLimit: 5
})

export async function db(sql, params = []) {
  let conn
  try {
    conn = await pool.getConnection()
    const rows = await conn.query(sql, params) 
    return rows
  } finally {
    if (conn) conn.release()
  }
}
