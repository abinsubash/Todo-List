const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  todoId:{
    type:mongoose.Schema.Types.ObjectId,
  }
});

const User = mongoose.model('User',userSchema);
module.exports = User