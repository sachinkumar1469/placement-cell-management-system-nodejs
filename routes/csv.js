const router = require("express").Router();
const Student = require("../model/student");
const path = require("path");

const fs = require('fs');

router.get("/",(req,res,next)=>{
    Student.find({})
        .then(result=>{
            // console.log(result);
            const stud = result.map(stu=>{
                const {name,email,batch,college,status : placed,scores,_id:studentId} = stu;
                let updatedScore = {};
                scores.forEach(score=>{
                    updatedScore[score.name] = score.marks
                })
                // console.log(updatedScore);
                return {name,email,batch,college,placed,studentId,...updatedScore}
            })
            console.log(stud);

            let report = "student Id, Student name,Student college,Student Batch, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score";
            // let studentData1 = "";

            for (let student of stud) {
                let studentData1 =
                    student.studentId +
                    "," +
                    student.name +
                    "," +
                    student.college +
                    "," +
                    student.batch +
                    ","+
                    student.email +
                    "," +
                    student.placed +
                    "," +
                    student.dsa_score +
                    "," +
                    student.web_score +
                    "," +
                    student.react_score;
            
                report += "\n" + studentData1;
            }

            const csvFile = fs.writeFile("uploads/studentsReport.csv",report,(err,data)=>{
                if(err){
                    console.log(err);
                    return res.redirect("back");
                }

                return res.download(path.join(__dirname,"..","uploads","studentsReport.csv"));
            })

        })
        .catch(err=>{
            console.log(err);
        })
})

module.exports = router;