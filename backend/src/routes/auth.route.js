import express from "express";
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router()

/**
 * @route /api/auth/signup
 * @method POST 
 */
authRouter.post("/signup", signup)

/**
 * @route /api/auth/login
 * @method POST 
 */
authRouter.post("/login", login)

/**
 * @route /api/auth/logout
 * @method POST 
 */
authRouter.post("/logout", logout)

/**
 * @route /api/auth/me
 * @method GET
 */
authRouter.get("/me", protectRoute, (req,res)=>{
    res.status(200).json({
        success: true,
        user: req.user
    })
})

/**
 * @route /api/auth/onboarding
 * @method POST
 */
authRouter.post("/onboarding", protectRoute, onboard)

export default authRouter