const User = require("../../model/userModel");
const Otp = require("../../model/otpModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Todo = require("../../model/todoModel");
require("dotenv").config();

async function sendOtp(email, otp) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let mailOption = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };
  try {
    await transporter.sendMail(mailOption);
    console.log("Otp sented succesfully ");
    return otp;
  } catch (error) {
    console.log(error);
  }
}

exports.login = (req, res) => {
  res.render("user/login");
};
exports.loginValidation = async (req, res) => {
  const { email_username, password } = req.body;
  let user;
  if (email_username.includes("gmail.com")) {
    user = await User.findOne({ email: email_username });
  } else {
    user = await User.findOne({ user_name: email_username });
  }
  if (!user) {
    return res.json({ success: false, message: "User not exist" });
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return res.json({ success: false, message: "Wrong Password" });
  }
  req.session.userExist = user;
  res.cookie("userId", user.id, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
  });
  return res.json({ success: true });
};
exports.signup = (req, res) => {
  res.render("user/signup");
};

exports.otp = (req, res) => {
  res.render("user/otp");
};
exports.signupForm = async (req, res) => {
  try {
    const { name, user_name, email, password } = req.body;
    const user_name_Exist = await User.findOne({ user_name: user_name });
    const email_Exist = await User.findOne({ email: email });
    if (user_name_Exist) {
      return res.json({
        success: false,
        message: "Username already exist.please Enter another username",
      });
    }
    if (email_Exist) {
      return res.json({ success: false, message: "Email already exist" });
    }
    const hashed_password = await bcrypt.hash(password, 10);
    const temp_user = new User({
      name,
      user_name,
      email,
      password: hashed_password,
    });
    req.session.temp_user = temp_user;
    const otp = Math.floor(1000 + Math.random() * 9000);
    sendOtp(email, otp);
    const otpUser = new Otp({
      email: email,
      otp: otp,
    });
    await otpUser.save();
    if (!otp) {
      return res.json({ success: false, message: "Something went wrong" });
    }
    res.json({ success: true, message: "Otp sented SuccessFully" });
  } catch (error) {
    console.log("signin form", error);
  }
};

exports.otp_verification = async (req, res) => {
  try {
    const { entered_otp } = req.body;
    const user = await Otp.findOne({ email: req.session.temp_user.email });
    if(!user){
      return console.log("User not found")
    }
    if (entered_otp !== user.otp) {
      return res.json({
        success: false,
        message: "Otp is Wrong please enter correct otp",
      });
    } else {
      const saving_user = new User(req.session.temp_user);
      await saving_user.save();
      console.log(saving_user._id)
      const todo_user = new Todo({
        userId:saving_user._id
      })
      await todo_user.save()
      return res.json({ success: true, message: "SignUp successfully" });
    }
  } catch (error) {
    console.log("otp validation", error);
  }
};

exports.resend_otp = async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const email = req.session.temp_user.email;
    sendOtp(email, otp);

    const deleted = await Otp.deleteOne({ email: email });
    console.log("resend successfull", req.session.temp_user.email, otp);
    const otpUser = new Otp({
      email: email,
      otp: otp,
    });
    await otpUser.save();
    if (otpUser) {
      return res.json({ success: true });
    }
    return res.json({ success: false });
  } catch (error) {
    console.log(error);
  }
};

exports.home = (req, res) => {
  res.render("user/home", { user: req.session.userExist });
};

exports.todo = async(req, res) => {
  const todo_list = await Todo.findOne({userId:req.session.userExist._id})
  console.log(todo_list)
  res.render("user/todo", { user: req.session.userExist ,todo_list});
};

exports.logout = (req, res) => {
  delete req.session.userExist;
  res.redirect("/login");
};

exports.profile = (req, res) => {
  res.render("user/profile", { user: req.session.userExist });
};

exports.addTodo = async (req, res) => {
  try {
    const userId = req.session.userExist._id;
    const { list, date, timer } = req.body;
    console.log(userId)
    console.log(req.body)
    const todo_list = await Todo.findOne({userId:userId})
    console.log(todo_list)
    if(todo_list){
      console.log("hi")
    }
    res.status(200).json( savedToDo );
  } catch (error) {
    res.status(500).json({ error: "Failed to save todo item." });
  }
};
