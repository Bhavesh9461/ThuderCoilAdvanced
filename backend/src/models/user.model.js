import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required."]
    },
    userName: {
        type: String,
        required: [true, "User Name is required."],
        unique: [true, "Username is already exists."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email exists already try another."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: 6,
        select: false
    },
    bio:{
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    skill:{
        type: String,
        default: ""
    },
    language: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date

}, {timestamps: true})

/**
 * @hook pre hook
 * @description it is used to hash password in schema
 */
userSchema.pre("save", async function() {
    if(!this.isModified("password")) return 

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    } catch (error) {
        console.log(error);
    }
})

/**
 * @description used to compare password at login
 * @way for create a method you have to do like this -> userSchema.methods.<methodName>
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password)
    return isPasswordCorrect
}

const userModel = mongoose.model("User",userSchema)

export default userModel