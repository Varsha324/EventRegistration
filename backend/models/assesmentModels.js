const mongoose = require("mongoose")
const assesmentSchema = mongoose.Schema({
    user_id:
    {
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:"User"
    },
    name:{
        type:String,
        required:[true,"Please Enter The Name"]
    },
    rollnumber:{
            type:String,
            required:[true,"Please Enter The Rollnumber"]
    },
    event:{
        type: String,
        required:[true,"Please Enter The Event"]
    },
    time:{
        type:"Date",
        required:[true,"Select the time"]
    },
    remarks: { type: String, default: "" },
    status:{
        type:"String",
        enum:["Approved","Rejected","Pending"],
        default:"Pending"
    }
},
{
    timestamps:true,
}
)

module.exports  = mongoose.model("Assesment",assesmentSchema)