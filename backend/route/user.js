const { Router } = require("express");
const User = require("../modle/user");
const router = Router(); 
const jwt = require("jsonwebtoken")

const secretKey = "jbvieublvdubfvldfbvliufbvdufb";

router.post("/signup", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
 
    try {
        const createdUser = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        });
        const token = await jwt.sign({ userId: createdUser._id },secretKey, {expiresIn: "5d"} )
        return res.status(201).json({token,createdUser, message:"User Created Succesfully"});
    } catch (error) {
        return res.json({ message: `error while creating account ${error}` });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({
                error: "Invalid Username and Password",
            });
        }
        const token = await jwt.sign({ userId: user._id },secretKey, {expiresIn: "5d"} )
        return res.status(201).json({token,user, message: "Logged In Succesfully"});
    } catch (error) {
        
        return res.json({message: "nvalid email and password. Please check your email and password."});
    }
});

module.exports = router;
