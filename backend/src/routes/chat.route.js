import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const chatRouter = express.Router()

/**
 * @route /api/chat/token
 * @description generate a stream token
 * @access PRIVATE
 */
chatRouter.get("/token", protectRoute, getStreamToken)

export default chatRouter