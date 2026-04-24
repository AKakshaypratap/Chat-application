import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(422).json({
                message: "Please enter all the fields"
            });
        }
        if (password !== confirmPassword) {
            return res.status(401).json({
                message: "Password mismatch"
            });
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(409).json({
                message: "User already Exists"
            });
        }

        const hasedPassword = await bcrypt.hash(password, 10);
        const boyProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = await User.create({
            fullName,
            userName,
            password: hasedPassword,
            profilePhoto: gender === "male" ? boyProfilePhoto : girlProfilePhoto,
            gender
        });
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({
                message: "Please enter all the fields"
            });
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Password not matched"
            })
        };

        const tokenData = { userId: user._id }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("usertoken", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    };
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("usertoken", "", { maxAge: 0 }).json({
            message: "Logged Out succesfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}