import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";

const app = express()
const __dirname = path.resolve()

//some setup code
app.use(cors({    // this allows token from browser
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json()) // to access body's content
app.use(cookieParser())

/**
 * @TODO
 */
// if(process.env.NODE_ENV === "production"){
//     app.use()
// }

export default app