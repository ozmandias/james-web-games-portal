import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

// module.exports = db;
export default db;