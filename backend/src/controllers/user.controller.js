import friendRequestModel from "../models/friendRequest.model.js";
import userModel from "../models/user.model.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id; // id -> get normal userId but when you use _id -> it give  ObjectId format

    const currentUser = req.user;

    const recommendedUsers = await userModel.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude current user -> means myself
        { _id: { $nin: currentUser.friends } }, // exclude current user's friends
        { isOnboarded: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("friends")
      .populate("friends", "fullName userName profilePic skill language");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    /**
     * @description prevent sending request to yourself
     */
    if (myId === recipientId) {
      return res.status(400).json({
        message: "You can't send friend request to yourself.",
      });
    }

    /**
     * @description check recipient is exists or not in db
     */
    const recipient = await userModel.findById(recipientId);

    if (!recipient) {
      return res.status(400).json({
        message: "Recipient is not found!",
      });
    }

    /**
     * @description check they are already friend or not in friends collection
     */
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends with this user.",
      });
    }

    /**
     * @description check if a request already exists
     */
    const existingRequest = await friendRequestModel.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user.",
      });
    }

    /**
     * @description finally create or send friend request.
     */
    const friendRequest = await friendRequestModel.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    /**
     * @description check request is exists or not
     */

    const friendRequest = await friendRequestModel.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found!",
      });
    }

    /**
     * @description verify the current user is the recipient or not in that friend request
     */
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to accept this request.",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    /**
     * @description add each user to the other's friends array
     * @method $addToSet adds elements to an array only if they do not already exists
     */

    await userModel.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await userModel.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({
      message: "Friend request accepted.✅",
    });
  } catch (error) {
    console.error("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

export async function getFriendRequests(req,res) {
  try {
    /**
     * @description get all pending incoming requests
     */
    const incomingReqs = await friendRequestModel.find({
      recipient: req.user.id,
      status: "pending"
    }).populate("sender", "fullName userName profilePic skill language")

    /**
     * @description get all my accepted requests
     */
    const acceptedReqs = await friendRequestModel.find({
      sender: req.user.id,
      status: "accepted"
    }).populate("recipient", "fullName userName profilePic")

    res.status(200).json({incomingReqs, acceptedReqs})
  } catch (error) {
    console.error("Error in getFriendRequests controller: ", error.message);
    res.status(500).json({
      message: "Internal Server Error!"
    })
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingReqs = await friendRequestModel.find({
      sender: req.user.id,
      status: "pending"
    }).populate("recipient", "_id fullName userName skill profilePic language")

    res.status(200).json(outgoingReqs)
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs controller: ", error.message);
    res.status(500).json({
      message: "Internal Server Error!"
    })
  }
}