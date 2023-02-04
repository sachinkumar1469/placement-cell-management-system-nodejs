const router = require("express").Router();
const path = require("path");

const Student = require('../model/student');
const Interview = require('../model/interview');

router.get("/",(req,res,next)=>{
    if(req.isUnauthenticated()){
        return res.redirect("/auth/login")
    }

    Student.find({})
    .then(students=>{
        return Interview.find({})
            .then(interviews=>{
                res.render(path.join(__dirname,"..","views","home"),{students,interviews});
            })
    })
    .catch(err=>{
        console.log(err);
    })
});



module.exports = router;