import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

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

export default authRouter