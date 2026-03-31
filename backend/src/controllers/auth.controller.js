import { upsertStreamUser } from "../lib/stream.js";
import userModel from "../models/user.model.js";
import crypto from "crypto";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../brevo/email.js";

export async function signup(req, res) {
  const { fullName, userName, email, password } = req.body;

  try {
    if (!fullName || !userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    /**
     * @description checks password length
     */
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 charachters.",
      });
    }

    /**
     * @description check email format using regex format
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format!",
      });
    }

    const isUserExists = await userModel.findOne({ userName });

    if (isUserExists) {
      return res.status(400).json({
        message: "User already exists with this username",
      });
    }

    /**
     * @description create default avatar for profilePic
     */
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://api.dicebear.com/9.x/micah/svg?seed=${idx}.jpg`;

    const verificationToken = generateVerificationToken();

    const newUser = await userModel.create({
      fullName,
      userName,
      email,
      password,
      profilePic: randomAvatar,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    /**
     * @description create stream user
     */
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.userName,
        image: newUser.profilePic || "",
      });
    } catch (error) {
      console.log("Error creating in stream user: ", error);
    }

    /**
     * @description generate cookie or token
     */
    generateTokenAndSetCookie(res, newUser._id);

    await sendVerificationEmail(newUser.email, verificationToken);

    newUser.password = undefined;
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}

export async function verifyEmail(req, res) {
  try {
    const { code } = req.body;

    // if (!code) {
    //   return res.status(400).json({
    //     message: "Otp is required.",
    //   });
    // }

    const user = await userModel.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullName);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.log(`Error in verifyEmail controller: `, error);
    throw new Error(`Error in  verifyEmail controller:`, error);
  }
}

export async function login(req, res) {
  const { userName, password } = req.body;

  try {
    if (!userName || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    /**
     * @description check email is exists or not
     */
    const user = await userModel.findOne({ userName }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    /**
     * @descrption check password is correct or not
     */
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    if (!user.isVerified) {
      const verificationToken = generateVerificationToken();

      user.verificationToken = verificationToken;
      ((user.verificationTokenExpiresAt = Date.now() + 10 * 60 * 60 * 1000), // 10 minutes
        await user.save());

      await sendVerificationEmail(user.email, verificationToken);

      return res.status(401).json({
        message:
          "You are not verified, verify first from email that we sent now.",
      });
    }

    /**
     * @description finally login and generate token for login
     */
    generateTokenAndSetCookie(res, user._id);

    user.password = undefined;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logout successfull.",
  });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;

    const { fullName, bio, skill, language, location } = req.body;

    if (!fullName || !bio || !skill || !language || !location) {
      return res.status(400).json({
        message: "All fields are required.",
        missingFields: [
          !fullName && "fullname",
          !bio && "bio",
          !skill && "skill",
          !language && "language",
          !location && "location",
        ].filter(Boolean),
      });
    }

    /**
     * @description update a existing user in db
     */
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { returnDocument: "after" },
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    /**
     * @description update the user info in stream platfrom
     */
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.userName,
        image: updatedUser.profilePic || "",
      });

      console.log(
        `Stream user updated after onboarding for ${updatedUser.fullName}`,
      );
    } catch (streamError) {
      console.log(
        "Error updating Stream user during onboarding: ",
        streamError.message,
      );
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in onboard controller: ", error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

export async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    //generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    //send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    );

    res.status(200).json({
      success: true,
      message: "Sent forgot password email successfully.",
    });
  } catch (error) {
    console.log("Error in forgotPassword controller: ", error);
    throw new Error("Error in forgotPassword controller: ", error);
  }
}

export async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password missing!",
      });
    }

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token." });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email, user.fullName);

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully.",
    });
  } catch (error) {
    console.log("Error in resetPassword controller: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function searchUser(req,res) {
  try {
    const {userName} = req.body

    if(!userName){
      return res.status(400).json({message: "Username is required."})
    }

    const user = await userModel.findOne({userName})

    if(!user){
      return res.status(400).json({
        message: "User not found!"
      })
    }

    res.status(200).json({
      success: true,
      message: "User found.",
      user
    })
  } catch (error) {
    console.log("Error in searchUser controller: ", error.message);
    res.status(500).json({
      message: "Internal server error!"
    })
  }
}
