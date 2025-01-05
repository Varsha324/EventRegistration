const asyncHandler = require("express-async-handler")
const Assesment = require('../models/assesmentModels')

const createAssesments = asyncHandler(async(req,res)=>
{
    const {name,rollnumber,event,time} = req.body
    if(!name||!rollnumber||!event||!time){
        res.status(400)
        throw new Error("All details are required")
    }
    const assesments = await Assesment.create({
        name,rollnumber,event,time,user_id: req.user.id
    })
    res.status(200).json(assesments);
})
const getAllAssesment = asyncHandler(async(req,res)=>{
const assesments = await Assesment.find();
res.status(200).json(assesments);
})

const getAssesment = asyncHandler(async(req,res)=>{
    const assesments = await Assesment.find({user_id: req.user.id});
    res.status(200).json(assesments);
})

const updateAssesment = asyncHandler(async(req,res)=>{
const assesments = await Assesment.findById(req.params.id)
if(!assesments){
    res.status(400)
    throw new Error("The assesment is not registered")
}
const updatedAssesment = await Assesment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
)
res.status(200).json(updatedAssesment)
})
const approveOrRejectAssesment = asyncHandler(async (req, res) => {
    const { status, remarks } = req.body;
    const validStatuses = ["Approved", "Rejected", "Pending"];
  
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid status");
    }
  
    const updatedAssessment = await Assesment.findByIdAndUpdate(
      req.params.id,
      { status, remarks: remarks || "" },
      { new: true, runValidators: true }
    );
  
    if (!updatedAssessment) {
      res.status(404);
      throw new Error("Assessment not found");
    }
  
    res.status(200).json(updatedAssessment);
  });


module.exports={getAllAssesment,getAssesment,updateAssesment,createAssesments,approveOrRejectAssesment};