const mongoose = require("mongoose");

const regSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required : [true , "Please enter your name"]
    },
    rollnumber:{
        type:String,
        required:[true , "Please enter your rollnumber"]
    },
    eventname:{
        type:String,
        required:[true,"Please enter the event name"]
    },
    organiser:{
        type : String,
        required:[true,"Please enter the organiser"]
    },
    weblink:{
        type : String,
        required:[true,"Please enter the website link"]
    },
    startdate:{
        type:Date,
        required:[true,"Please enter the start date"]
    },
    enddate:{
        type:Date,
        required:[true,"Please enter the end date"]
    }
},{
    timestamps:true,
}
);

module.exports = mongoose.model("Register",regSchema);