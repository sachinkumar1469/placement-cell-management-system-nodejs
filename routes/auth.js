const express = require('express');
const path = require("path");


const passport = require('../config/passport');
const User = require("../model/user");

const router = express.Router();

router.get("/login",(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    console.log(req.isAuthenticated());
    res.render(path.join(__dirname,"..","views","login"));
});

router.get("/signup",(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    console.log(req.isAuthenticated());
    res.render(path.join(__dirname,"..","views","signup"));
});

router.post("/login",passport.authenticate("local",{failureRedirect:"/auth/login"}),(req,res,next)=>{
    // console.log(req.user);
    res.redirect("/");
});

router.post("/signup",(req,res,next)=>{
    console.log(req.body);
    const {name,email,password} = req.body;
    User.findOne({email})
    .then(result=>{
        if(result){
            return res.redirect("/auth/login");
        }
        User.create(req.body)
        .then(user=>{
            // console.log(user);
            return res.redirect("/auth/login");
        })
    })
});

router.get("/logout",(req,res,next)=>{
    req.logout(err=>{
        if(err){
            
        } else {
            res.redirect("/auth/login");
        }
    });
})

module.exports = router;