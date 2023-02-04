const router = require("express").Router();
const path = require('path');

const Interview = require("../model/interview");
const Student = require("../model/student");

router.get("/add",(req,res,next)=>{
    // console.log(req.body);
    res.render(path.join(__dirname,"..","views","add-interview"));
})

router.post("/add",(req,res,next)=>{
    const {companyName,date} = req.body;

    const newInterview = new Interview({
        companyName,
        date,
        students:[]
    });

    newInterview.save()
        .then(result=>{
            console.log(result);
            res.redirect("back");
        })
        .catch(err=>{
            console.log(err);
            res.redirect("back");
        })
});

router.get("/:_id",(req,res,next)=>{
    console.log("Here");
    console.log(req.params);
    Interview.findById(req.params._id)
        .then(interview=>{
            res.render(path.join(__dirname,"..","views","interview-detail"),{interview});
        })
        .catch(err=>{
            console.log(err);
        })
});

router.post("/:_id",(req,res,next)=>{
    const {companyName,date} = req.body;
    Interview.findByIdAndUpdate(req.params._id,{
        companyName,
        date
    })
    .then(updatedInt=>{
        console.log(updatedInt);
        res.redirect("back");
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get("/delete/:_id",(req,res,next)=>{
    console.log(req.params._id);
    Interview.findByIdAndDelete(req.params._id)
        .then(result=>{
            res.redirect("/");
        })
        .catch(err=>{
            console.log(err);
        })
})

router.post("/add-student/:_id",(req,res,next)=>{
    console.log(req.params);
    console.log(req.body);
    const {studentEmail} = req.body;

    Student.findOne({email:studentEmail})
    .then(studentRes=>{
        if(!studentRes){
            return res.redirect("back");
        }
        console.log(studentRes);
        Interview.findById(req.params._id)
            .then(currInt=>{
                currInt.students.push({
                    name:studentRes.name,
                    email:studentRes.email,
                    result:"NOT_ATTEMPTED"
                })
                studentRes.interviews.push({
                    interviewID:req.params._id,
                    date:currInt.date,
                    companyName:currInt.companyName,
                    result:"NOT_ATTEMPTED"
                })
                return currInt.save();
            })
            .then(()=>{
                studentRes.save();
                res.redirect("back");
            })
            .catch(err=>{
                console.log(err);
            })
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;