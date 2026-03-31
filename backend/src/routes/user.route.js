import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";

const userRouter = express.Router()

/**
 * @description apply auth middleware to all routes
 * @uses when you have to add this route to before all controllers
 */
userRouter.use(protectRoute)

/**
 * @route GET /api/users/
 * @description get all recommended users from db
 * @access PRIVATE
 */
userRouter.get("/", getRecommendedUsers)

/**
 * @route GET /api/users/friends
 * @description get all friends from db
 * @access PRIVATE
 */
userRouter.get("/friends", getMyFriends)

/**
 * @route POST /api/users/friend-request/:id
 * @description send a friend-request to user
 * @access PRIVATE
 */
userRouter.post("/friend-request/:id", sendFriendRequest)

/**
 * @route POST /api/users/friend-request/:id/accept
 * @description update or accept friend-request of user
 * @access PRIVATE
 */
userRouter.put("/friend-request/:id/accept", acceptFriendRequest)

/**
 * @route GET /api/users/friend-requests
 * @description get all friend requests that a recipient (me) gets
 * @access PRIVATE
 */
userRouter.get("/friend-requests", getFriendRequests)

/**
 * @route GET /api/users/outgoing-friend-requests
 * @description get all friend requests that I sent to others
 * @access PRIVATE
 */
userRouter.get("/outgoing-friend-requests", getOutgoingFriendReqs)

export default userRouter