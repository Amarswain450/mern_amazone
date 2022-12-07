const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
var bcrypt = require('bcryptjs');
const authenicate = require("../middleware/auth-middleware");


router.post("/register", async (req, res) => {
    //console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({
            statu: 422,
            error: "All fields are required"
        });
    }
    try {
        const preUser = await User.findOne({ email });
        if (preUser) {
            res.status(422).json({
                status: 422,
                error: "This user is already exists"
            })
        } else if (password !== cpassword) {
            res.status(422).json({
                status: 422,
                error: "password and cpassword not matches"
            })
        } else {

            //password hashing process


            const finalUser = new User({
                fname,
                email,
                mobile,
                password,
                cpassword
            });
            const storedData = await finalUser.save();
            //console.log(storedData);
            res.status(201).json({
                status: 201,
                storedData
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err
        })
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({
            statu: 422,
            error: "All fields are required"
        });
    }

    try {
        const existUser = await User.findOne({ email });
        //console.log(existUser);
        if (existUser) {
            const isMatch = await bcrypt.compare(password, existUser.password);
            //console.log(isMatch);
            if (!isMatch) {
                res.status(422).json({
                    status: 422,
                    error: "Invalid credentials"
                })
            } else {
                //Generate Token
                const token = await existUser.generateToken();
                // //console.log(token);
                // res.cookie("Amazoneweb", token, {
                //     expires: new Date(Date.now() + 1000 * 60 * 15),
                //     httpOnly: true
                // });
                res.status(201).json({
                    status: 201,
                    existUser, token
                })
            }
        } else {
            res.status(422).json({
                status: 422,
                error: "Invalid credentials"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err
        })
    }
});

router.get("/logout", authenicate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((val) => {
            return val.token !== req.token
        });
        await req.user.save();
        res.status(200).json({
            status: 200,
            message: "User logout"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err
        })
    }
})


module.exports = router;