const products = require("./constants/productsData");
const Product = require("./models/productSchema");

const defaultData = async (req, res) => {
    try {
        await Product.deleteMany({});
        const response = await Product.insertMany(products);
        // console.log(response);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = defaultData;