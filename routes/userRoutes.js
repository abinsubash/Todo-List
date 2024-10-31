const express = require('express')
const userRoutes = express.Router()
const userController = require('../controller/user/userController')
const userAuth = require('../middleware/userAuth')
//Todo: Login
userRoutes.get('/login',userController.login);
userRoutes.post('/login',userController.loginValidation)
//Todo: Signup
userRoutes.get('/signup',userController.signup)
userRoutes.get('/otp',userController.otp)
userRoutes.post('/otp',userController.otp_verification);
userRoutes.post('/resend_otp',userController.resend_otp)
userRoutes.post('/signupForm',userController.signupForm);
userRoutes.get('/logout', userController.logout);
//Todo: Home
userRoutes.get('/',userController.home)
//Todo: TodoPage
userRoutes.get('/todo',userAuth.userExist,userController.todo)
userRoutes.post('/api/todo',userAuth.userExist,userController.addTodo)

userRoutes.get('/profile',userAuth.userExist,userController.profile)
module.exports = userRoutes