const router = require('express').Router();
const path = require("path");

const Student = require("../model/student");

router.get("/add",(req,res,next)=>{
    res.render(path.join(__dirname,"..","views","add-student"));
});

router.post("/add",(req,res,next)=>{
    // console.log(req.body);
    const {name,email,batch,college,status,dsa_score,web_score,react_score} = req.body;

    const newStudent = new Student({
        name,
        email,
        batch,
        college,
        status,
        scores:[
            {
                name:"dsa_score",
                marks:dsa_score
            },
            {
                name:"web_score",
                marks:web_score
            },
            {
                name:"react_score",
                marks:react_score
            },
        ],
        interviews:[]
    });

    newStudent.save()
        .then(res=>{
            // console.log("Student saved in db");
            // console.log(res);
            res.redirect("back");
        })
        .catch(err=>{
            console.log(err);
            res.redirect("back");
        })
});

router.get("/:_id",(req,res,next)=>{
    console.log(req.params);
    Student.findById(req.params._id)
        .then(student=>{
            console.log(student);
            // student.scores.forEach(score=>{
            //     JSON.parse(score);
            // })
            res.render(path.join(__dirname,"..","views","student-detail"),{student});
        })
        .catch(err=>{
            console.log(err);
        })
})

router.post("/:_id",(req,res,next)=>{
    // console.log(req.body);
    const {name,email,batch,college,status,dsa_score,web_score,react_score} = req.body;
    Student.findByIdAndUpdate(req.params._id,{
        name,
        email,
        batch,
        college,
        status,
        scores:[
            {
                name:"dsa_score",
                marks:dsa_score
            },
            {
                name:"web_score",
                marks:web_score
            },
            {
                name:"react_score",
                marks:react_score
            },
        ],
    })
    .then((result)=>{
        console.log("Updated");
        console.log(result);
        res.redirect("back");
    })
    .catch(err=>{
        console.log(err);
    })
})


router.get("/delete/:_id",(req,res,next)=>{
    console.log(req.params._id);
    Student.findByIdAndDelete(req.params._id)
    .then(result=>{
        res.redirect("/");
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;