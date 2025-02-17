import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME
  }
}
