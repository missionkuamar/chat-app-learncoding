import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const secureRoute = async (req, res, next) => {
  try {
   const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found",
        error: "Authorization denied",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRECT);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error: err.message,
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in secureRoute:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error in secureRoute",
      error: error.message,
    });
  }
};

export default secureRoute;
