import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";


export const signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password mismatch",
        data: [],
      });
    }
    if (!fullname || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please all field are required",
        data: [],
      });
    }
    const ExistingUser = await User.findOne({ email });
    if (ExistingUser) {
      return res.status(404).json({
        success: false,
        message: "This email is already exists",
        data: [],
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    const userResponse = {
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
    };
    return res.status(201).json({
      success: true,
      message: "user create successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("signUp Error :", error.message);
    return res.status(500).json({
      success: true,
      message: "Error in Signup route",
      error: error.message,
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ Create token and send it in cookie + response
    const token = createTokenAndSaveCookie(user._id, res);

    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token, // ✅ Send token in response body too (for testing or frontend use)
      data: userResponse,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // ✅ Clear the cookie by setting it to an expired value
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Error in logout api", error.message);
    return res.status(500).json({
      success: false,
      message: "Error in logout api",
      error: error.message,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user?._id;  // ✅ corrected

    if (!loggedInUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    return res.status(200).json({
      success: true,
      users: filteredUsers,
    });
  } catch (error) {
    console.error("Error in getting all users route:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error in get all users API",
      error: error.message,
    });
  }
};
