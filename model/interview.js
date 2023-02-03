const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
    companyName:{
        type:String,
        required:true
    },
    date: {
        type: String,
        required: true,
    },
    students:[{
        student:{
            type:Schema.Types.ObjectId,
            ref:"Student"
        },
        result:{
            type:String,
            enum:["PASS","FAIL","HOLD","NOT_ATTEMPTED"]
        }
    }]
})