import express from "express";
import { forgotPassword, login, logout, onboard, resetPassword, signup, verifyEmail } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router()

/**
 * @route /api/auth/signup
 * @method POST 
 */
authRouter.post("/signup", signup)

/**
 * @route /api/auth/verify-email
 * @method POST 
 */
authRouter.post("/verify-email", verifyEmail)

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

/**
 * @route /api/auth/forgot-password
 * @method POST
 */
authRouter.post("/forgot-password", forgotPassword)

/**
 * @route /api/auth/reset-password/:token
 * @method POST
 */
authRouter.post("/reset-password/:token", resetPassword)

export default authRouter