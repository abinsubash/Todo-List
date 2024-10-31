const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    todo_list:[{
        list:{
            type:String,
        },
        date: {
            type: Date,
        },
        timer: {
            type: Number,  
        }
    }]
})

const Todo = mongoose.model('todo',todoSchema);
module.exports=Todo
