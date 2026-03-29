import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";

/**
 * @description import routes
 */
import authRoutes from "./routes/auth.route.js";


const app = express()
const __dirname = path.resolve()

//some setup code
app.use(cors({    // this allows token from browser
    origin: process.env.CLIENT_URL,
    credentials:true
}))
app.use(express.json()) // to access body's content
app.use(cookieParser())



// use routes
app.use("/api/auth", authRoutes)

/**
 * @TODO
 */
// if(process.env.NODE_ENV === "production"){
//     app.use()
// }

export default app