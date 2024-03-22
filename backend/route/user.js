const { Router } = require("express");
const User = require("../modle/user");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "jbvieublvdubfvldfbvliufbvdufb";

router.post("/signup", async (req, res) => {
    const { firstname, lastname, email, password, profileImageURL } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            profileImageURL: profileImageURL,
        });
        const token = jwt.sign({ userId: createdUser._id }, secretKey, { expiresIn: "5d" });
        return res.status(201).json({ token, createdUser, message: "User Created Successfully" });
    } catch (error) {
        return res.json({ message: `Error while creating account ${error}` });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "Invalid Username and Password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid Username and Password",
            });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "5d" });
        return res.status(201).json({ token, user, message: "Logged In Successfully" });
    } catch (error) {
        return res.json({ message: "Invalid email and password. Please check your email and password." });
    }
});

module.exports = router;
