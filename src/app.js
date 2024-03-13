import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// we have written this beacuse to create a limit so that a server can 
app.use(express.json({ limit: "16kb" }))

// this is basically used to create a encoder that encondes the url
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

//use to store the public assets 
app.use(express.static("public"))

//for secure cookies 
app.use(cookieParser())

export { app }