const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAdmin = async (req, res, next) =>{
    try {
        const token = req.headers["authorization"];
        // Check if token is provided
       // console.log(token);
        if (!token) {
            return res.status(400).send({errors:[{msg : "Not authorized 1 token not found"}]})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne({ _id: decoded.id });
        if (!foundUser) {
            return res.status(400)
            .send({errors: [{msg : "Not authorized 2 user not found"}]});
        }
        // Check if the user is an admin
        if (!foundUser.isadmin) {
            return res.status(403).send({errors: [{msg : "Not authorized 3 user is not an admin"}]});
        }
        // If the user is an admin, attach the user to the request object and call next
        console.log("admin access granted for user:", foundUser.email);
        req.user = foundUser;
        next();
    } catch (error) {
        return res.status(400).send({errors: [{msg : "Not authorized 3 error in isAuth middleware"}]});
    }
};
module.exports = isAdmin;