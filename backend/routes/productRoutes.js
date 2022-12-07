const express = require("express");
const Product = require("../models/productSchema");
const router = express.Router();

router.get("/get-products", async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json({
            status: 200,
            products
        })
    }catch(err){
        res.status(422).json({
            status: 422,
            err
        })
    }
});

router.get("/get-products-one/:id", async (req, res) => {
    //console.log(req.params);
    const {id} = req.params;
    try{
        const product = await Product.findOne({_id: id});
        res.status(200).json({
            status: 200,
            product
        })
    }catch(err){
        res.status(422).json({
            status: 422,
            err
        })
    }
})


module.exports = router;