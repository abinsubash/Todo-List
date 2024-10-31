const User = require('../model/userModel')

exports.userExist = (req,res,next)=>{
    if(!req.session.userExist){
        return res.redirect('/login')
    }else{
        next()
    }
}

