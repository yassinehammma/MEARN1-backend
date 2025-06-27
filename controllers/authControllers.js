
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// test controller
exports.test = async (req, res) => {
    try {
        res.status(200).send("Auth test route is working!");
    } catch (error) {
        console.error(`Error in auth test controller: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


//register controller
exports.register = async (req,res) =>{
    try {
        const { email, password } = req.body;
        // Check if username or email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Username or email already exists' });
        }
        // Create a new user
        let newUser = new User({ ...req.body });
        // Hash the password before saving
        const salt = 10;
        const hashedpassword = await bcrypt.hash(password, salt);
        newUser.password = hashedpassword;
        // Save the new user to the database
        await newUser.save();
        // create jwt token
        const token = jwt.sign(
          {
            id: newUser._id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        res.status(201).send({
            success : [{msg : "User registered successfully"}], newUser, token
        });
    } catch (error) {
        console.error(`Error in register controller: ${error.message}`);
        res.status(500).json({ errors : [{msg: "can not register"}] });
    }
};

//login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const foundUser = await User.findOne({email});
        if (!foundUser) {
            return res.status(400).send({ errors: [{ msg: 'user not found in this email' }] });
        }
        // Check if password is correct
        const hashedPassword = await bcrypt.compare(password, foundUser.password);
        if (!hashedPassword) {
            return res.status(400).send({ errors: [{ msg: 'Incorrect password' }] });
        }
        const token = jwt.sign(
          {
            id: foundUser._id,
            firstname: foundUser.firstname,
            lastname: foundUser.lastname,
            email: foundUser.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        res.status(200).send({
            success: [{msg: `Hello ${foundUser.firstname}, Welcome Back !`}],
            foundUser,
            token,
        });
    } catch (error) {
        console.error(`Error in login controller: ${error.message}`);
        res.status(500).send({ errors : [{msg: "can not login"}] });
        
    }
}