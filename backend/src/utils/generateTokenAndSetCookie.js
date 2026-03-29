import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res,userId)=>{
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true, // prevent xss attacks
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    return token
}