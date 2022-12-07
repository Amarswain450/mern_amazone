const mongoose = require("mongoose");


const connect = async () => {
    try{
        const response = await mongoose.connect(process.env.DATABASE_URL);
        if(response){
            console.log("Database connected...!!!");
        }
    }catch(err){
        console.log("Database not connected...!!!");
    }
}

module.exports = connect;