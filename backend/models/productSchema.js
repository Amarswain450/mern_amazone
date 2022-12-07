const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    id: {
        type: String
    },
    url: {
        type: String
    },
    detailsUrl: {
        type: String
    },
    title: {
        type: Object
    },
    price: {
        type: Object
    },
    description: {
        type: String
    },
    discount: {
        type: String
    },
    tagline: {
        type: String
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;