const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const authenicate = async (req, res, next) => {
    try{
        var authHeader = req.headers.authorization;
        //console.log("authHeader", authHeader);
        const token = authHeader.split(" ")[1]
        //console.log("auth_cookies", token);
        const result = jwt.verify(token, process.env.SECRET_KEY);
        //console.log("result", result);
        const user = await User.findOne({_id: result._id, "tokens.token": token});
        //console.log("user", user);
        if(!user){
            throw new Error("User not found");
        }

        req.token = token;
        req.user = user;
        req.userId = user._id;
        next();
    }catch(err){
        res.status(500).json({
            status: 500,
            error: "unauthorized user"
        })
        console.log(err);
    }
}

module.exports = authenicate;