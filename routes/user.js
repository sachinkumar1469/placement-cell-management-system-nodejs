const router = require("express").Router();
const path = require("path");

router.get("/",(req,res,next)=>{
    if(req.isUnauthenticated()){
        return res.redirect("/auth/login")
    }
    // console.log(req.isAuthenticated(),req.isUnauthenticated());
    // console.log("here",req.user);
    res.render(path.join(__dirname,"..","views","home"));
});

module.exports = router;