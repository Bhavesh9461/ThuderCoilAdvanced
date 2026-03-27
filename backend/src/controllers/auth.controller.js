import { upsertStreamUser } from "../lib/stream.js";
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken";

export async function signup(req,res) {
    const {fullName, userName, email, password} = req.body

    
    try {
        
        if(!fullName || !userName || !email || !password){
            return res.status(400).json({
                message: "All fields are required."
            })
        }

        /**
         * @description checks password length
         */
        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 charachters."
            })
        }

        /**
         * @description check email format using regex format
         */
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Invalid email format!"
            })
        }

        const isUserExists = await userModel.findOne({userName})

        if(isUserExists){
            return res.status(400).json({
                message: "User already exists with this username"
            })
        }

        /**
         * @description create default avatar for profilePic
         */
        const idx = Math.floor(Math.random() * 100) + 1
        const randomAvatar = `https://api.dicebear.com/9.x/micah/svg?seed=${idx}.jpg`

        const newUser = await userModel.create({
            fullName,
            userName,
            email,
            password,
            profilePic: randomAvatar
        })

        /**
         * @description create stream user
         */
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.userName,
                image: newUser.profilePic || ""
            })
        } catch (error) {
            console.log("Error creating in stream user: ", error);
        }


        /**
         * @description generate cookie or token
         */
        const token = jwt.sign(
            {
                userId: newUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true, // prevent xss attacks
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({
            success: true,
            user: newUser 
        })

    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

export async function login(req,res) {
    const {userName, password} = req.body

    try {
        if(!userName || !password){
            return res.status(400).json({
                message: "All fields are required."
            })
        }

        /**
         * @description check email is exists or not
         */
        const user = await userModel.findOne({userName}).select("+password")

        if(!user){
            return res.status(401).json({
                message: "Invalid credentials!"
            })
        }

        /**
         * @descrption check password is correct or not
         */
        const isPasswordCorrect = await user.matchPassword(password)

        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Invalid credentials!"
            })
        }

        /**
         * @description finally login and generate token for login
         */
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        user.password = undefined
        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
        
    }
}

export function logout(req,res) {
    res.clearCookie("jwt")
    res.status(200).json({
        success: true,
        message: "Logout successfull."
    })
}