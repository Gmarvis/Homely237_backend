import {config} from "dotenv"

config()

export const DATABASE_HOST = process.env.DATABASE_HOST
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME
export const DATABASE_NAME = process.env.DATABASE_NAME
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
export const DATABASE = process.env.DATABASE
export const PORT = process.env.PORT

export const EMAIL_HOST = process.env.EMAIL_HOST
export const EMAIL_USER_NAME = process.env.EMAIL_USER_NAME
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
export const MAILER_API = process.env.MAILER_SEND_API
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES = process.env.JWT_EXPIRES

export const CLIENT_APP_URL = process.env.CLIENT_APP_URL


