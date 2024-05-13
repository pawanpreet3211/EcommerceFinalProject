var userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    // console.log("Signing user up!");
    // console.log("req.body: ", req.body);
    const password = req.body.password;

    var data = {
        email: req.body.email,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        // fullName: req.body.fullName,
        // password: req.body.password,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    try {
        if (!data.email || !password) {
            // console.log("Fail 1");
            return res.json({
                status: false,
                message: "email and password are required",
            });
        }
        const findUser = await userModel.find({ email: data.email });
        if (findUser.length > 0) {
            // console.log("Fail 2");
            return res.json({
                status: false,
                message: "user already exist",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        data.passwordHash = hashedPassword;
        const user = await userModel(data);
        await user.save();
        // console.log("Signup Successfull");
        res.json({
            status: true,
            message: "Signup Successfull",
            result: user,
        });
    } catch (err) {
        // console.log("Fail 3");
        // console.log("error message: ", err.message);
        res.status(500).json({ err: err.message });
    }
};

exports.login = async (req, res) => {
    // console.log("loging user up!");
    // console.log("req.body: ", req.body);

    var data = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        if (!data.email || !data.password) {
            // console.log("Login fail 1!");

            return res.json({
                status: false,
                message: "email and password are required",
            });
        }
        // console.log("x1");
        const findUser = await userModel.findOne({ email: data.email });
        if (!findUser) {
            // console.log("Login fail 2!");

            return res.json({
                status: false,
                message: "email does not exsists",
            });
        }
        // console.log("x2");
        const comparePassword = await bcrypt.compare(
            data.password,
            findUser.passwordHash
        );
        // console.log("x3");
        if (!comparePassword) {
            // console.log("Login fail 3!");

            return res.json({
                status: false,
                message: "password incorrect",
            });
        }
        res.json({
            status: true,
            message: "Login Successfull",
            result: findUser,
        });
    } catch (err) {
        // console.log("Login fail 4!");
        // console.log("error message: ", err.message);

        res.status(500).json({ err: err.message });
    }
};

exports.info = async (req, res) => {
    var UserId = req.body.userID;

    try {
        console.log("Getting User info");
        
        const findUser = await userModel.findOne({ _id: UserId });
        
        if (!findUser) {
            // console.log("Failed to fetch user info");

            return res.json({
                status: false,
                message: "User does not exsist",
            });
        }
        
        res.json({
            status: true,
            message: "Found User",
            result: findUser,
        });
    } catch (error) {
        console.error("Erro message: ", error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.updatePassword = async (req, res) => {
    const { UserID, currentPassword, newPassword } = req.body;
    
    console.log("Updating password...");
    try {
        const user = await userModel.findById(UserID);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.passwordHash);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.passwordHash = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Erro updating password: ", error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.setUniquePhrase = async (req, res) => {
    const { userID, uniquePhrase } = req.body;

    console.log("unique phrase: ", uniquePhrase);
    console.log("Setting unique phrase...");
    
    try {
        const user = await userModel.findById(userID);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.uniquePhrase = uniquePhrase;

        await user.save();
        console.log("Setted phrase!!!");

        res.status(200).json({ message: "Unique phrase set successfully" });
    } catch (error) {
        console.error("Error setting unique phrase: ", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateUniquePhrase = async (req, res) => {
    const { userID, uniquePhrase } = req.body;

    console.log("unique phrase: ", uniquePhrase);
    console.log("Updating unique phrase...");
    
    try {
        // Find the user document by userID
        const user = await userModel.findById(userID);
        
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the uniquePhrase field in the user document
        user.uniquePhrase = uniquePhrase;

        // Save the updated user document back to the database
        await user.save();

        res.status(200).json({ message: "Unique phrase updated successfully" });
    } catch (error) {
        console.error("Error updating unique phrase: ", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.verifyPhrase = async (req, res) => {
    const { userID, uniquePhrase } = req.body;

    console.log("unique phrase user: ", userID);
    console.log("unique phrase: ", uniquePhrase);
    console.log("Verifying unique phrase...");
    
    try {
        const user = await userModel.findById(userID);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.uniquePhrase === uniquePhrase) {
            console.log("Verified");
            res.status(200).json({ message: "User verified successfully" });
        } else {
            console.log("Not Verified");
            res.status(500).json({ message: "Invalid User, Cannot process transaction" });
        }
    } catch (error) {
        console.error("Error updating unique phrase: ", error.message);
        res.status(500).json({ error: error.message });
    }
};

// module.exports = {
//     signup,
//     login,
// };
