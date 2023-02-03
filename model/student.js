const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name:String,
    marks:Schema.Types.Number
});

const interviewSchema = new Schema({
    interviewID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Interview"
    },
    date:{
        type:String,
        required:true,
    },
    result:{
        type:String,
        required:true,
        enum:["PASS","FAIL","HOLD","NOT_ATTEMPTED"]
    }
})

const studentSchema = new Schema({
    name:{
        type: Schema.Types.String,
        requried:true
    },
    email:{
        type: Schema.Types.String,
        required:true,
        unique:true
    },
    batch:{
        type: Schema.Types.String,
        required:true
    },
    college:{
        type: Schema.Types.String,
        requried:true
    },
    status:{
        type: Schema.Types.Boolean,
        required:true
    },
    scores:[
        courseSchema
    ],
    interviews:[
        interviewSchema
    ]
});

const Student = new mongoose.model("student",studentSchema);

module.exports = Student;