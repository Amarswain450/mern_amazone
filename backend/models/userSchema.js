const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not valid email address")
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    carts: Array
});

//Hashed password
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//Generate Token
userSchema.methods.generateToken = async function() {
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

//add to cart data
userSchema.methods.addToCartData = async function(cart){
    try{
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;