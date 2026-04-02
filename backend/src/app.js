import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";

/**
 * @description import routes
 */
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import userRoutes from "./routes/user.route.js";


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
app.use("/api/chat", chatRoutes)
app.use("/api/users", userRoutes)

/**
 * @TODO
 */
if(process.env.NODE_ENV === "production"){
      app.use(express.static(path.join(__dirname, "../frontend/dist")))

      app.get("*", (req,res)=>{
          res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
      })
  }

export default app