import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender's id is required."]
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Recipient's id is required."]
    },
    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending"
    }
}, {timestamps: true})

const friendRequestModel = mongoose.model("FriendRequest", friendRequestSchema)

export default friendRequestModel