const express = require('express');
const app = express();
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');
const PORT = process.env.PORT || 5000;
const connectMongo = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const MongoDBStore = require('connect-mongodb-session')(session);

dotenv.config();
connectMongo()


const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions'
  });
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(nocache());
app.use(cookieParser());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store, 
    cookie: { httpOnly: true, secure: false, maxAge: 3600000 }
  }))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'public')));

console.log(path.join(__dirname,'/views'))
app.use('/',userRoutes)
app.use('/admin',adminRoutes);



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})


