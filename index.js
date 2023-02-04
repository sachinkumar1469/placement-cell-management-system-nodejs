const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(expressSession);

const passport = require("./config/passport");

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://sachinyadav1469:Sachin%40123@cluster0.my3twen.mongodb.net/placement-cell?retryWrites=true&w=majority')
        .then(result=>{
            app.listen(4200);
        })
        .catch(err=>{
            console.log("Unable to connect to db");
        })

const store = new MongoDBStore({
    uri:'mongodb+srv://sachinyadav1469:Sachin%40123@cluster0.my3twen.mongodb.net/placement-cell?retryWrites=true&w=majority',
    collection:'authStore'
})

app.use(expressSession({
    secret:"mysecretcode",
    resave:false,
    saveUninitialized:false,
    store: store
}));

app.use(passport.initialize());

app.use(passport.session());

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use((req,res,next)=>{
    if(req.isAuthenticated()){
        console.log("In local middleware");
        res.locals.user = req.user;
    }
    next();
})

app.use("/auth",require("./routes/auth"));

app.use("/student",require("./routes/student"));

app.use("/interview",require("./routes/interview"));

app.use(require("./routes/user"));

