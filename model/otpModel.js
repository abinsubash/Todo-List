const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
    email:{
        type:String
    },
    otp:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:30,
    }
});
otpSchema.index({createdAt:1},{expiresAfterSeconds:30})

const Otp =mongoose.model("Otp",otpSchema)

module.exports = Otp