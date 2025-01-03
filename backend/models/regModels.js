const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const regSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    registration_id: {  
        type: Number,
        unique: true, 
        
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
    },
    status:{
        type:"String",
        enum:["Approved","Rejected","Pending"],
        default:"Pending"
    }
},{
    timestamps:true,
}
);

regSchema.plugin(AutoIncrement, { inc_field: 'registration_id', start_seq: 1 });

module.exports = mongoose.model("Register",regSchema);