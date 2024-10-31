const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectMongo =() =>{
    mongoose.connect(process.env.MONGO_URL,{})
    .then(()=>{
        console.log("MongoDB Connected")
    })
    .catch((error)=>{
        console.log("MongoDB connection error:", error)
    })
}

module.exports = connectMongo