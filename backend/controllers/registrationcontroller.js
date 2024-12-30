const asyncHandler= require("express-async-handler");
const Registration = require("../models/regModels");

const getEvents = asyncHandler(async(req,res)=>{
    const registrations = await Registration.find({user_id: req.user.id});
    res.status(200).json(registrations);
});

const createEvents = asyncHandler(async(req,res)=>{
   
    const {name,rollnumber,eventname,organiser,weblink,startdate,enddate,level} = req.body;
    if(!name||!rollnumber||!eventname||!organiser||!weblink||!startdate||!enddate||!level){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const registrations = await  Registration.create({
        name,rollnumber,eventname,organiser,weblink,startdate,enddate,level,user_id: req.user.id
    });
    res.status(201).json(registrations);
});

const deleteEvents = asyncHandler(async(req,res)=>{
    const registrations = await Registration.findById(req.params.id);
    if(!registrations){
        res.status(404);
        throw new Error("Event not found");
    }
    await Registration.deleteOne({ _id: req.params.id });

    res.status(200).json(registrations);
});

const updateEvents = asyncHandler(async(req,res)=>{
    const registrations = await Registration.findById(req.params.id);
    if(!registrations){
        res.status(404);
        throw new Error("Event not found");
    }
    const updatedRegistrations = await Registration.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    ) 
    res.status(200).json(updatedRegistrations);
});

const getEvent = asyncHandler(async(req,res)=>{
    const registrations = await Registration.findById(req.params.id);
    if(!registrations){
        res.status(404);
        throw new Error("Event not found");
    }
    res.status(200).json(registrations);
});

module.exports = {getEvent,getEvents,deleteEvents,updateEvents,createEvents};