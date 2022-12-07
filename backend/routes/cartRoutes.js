const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const Product = require("../models/productSchema");
const authenicate = require("../middleware/auth-middleware");


router.post("/add-to-cart/:id", authenicate, async (req, res) => {
    const {id} = req.params;
    try{
        const cart = await Product.findOne({_id: id});
        //console.log("cart", cart);
        const user = await User.findOne({_id: req.userId});
        //console.log("userContext", user);

        if(user){
            await user.addToCartData(cart);
            await user.save();
            res.status(200).json({
                status: 200,
                user
            })
        }
    }catch(err){
        res.status(500).json({
            status: 500,
            error: err
        })
    }
});

router.get("/cart-details", authenicate, async(req, res) => {
    try{
        const buyUser = await User.findOne({_id: req.userId});
        res.status(200).json({
            status: 200,
            buyUser
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            error: err
        });
    }
});

router.get("/verify-user", authenicate, async (req, res) => {
    try{
        const verifyUser = await User.findOne({_id: req.userId});
        res.status(200).json({
            status: 200,
            verifyUser
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            error: err
        });
    }
});

router.delete("/delete-cart/:id", authenicate, async (req, res) => {
    const {id} = req.params;
    //console.log(id);
    //console.log(req.user);
    try{
        req.user.carts = req.user.carts.filter((curVal) => {
            //console.log(curVal);
            return curVal._id != id
        });
        await req.user.save();
        res.status(200).json({
            status: 200,
            response: req.user
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            error: err
        });
    }
})

module.exports = router;