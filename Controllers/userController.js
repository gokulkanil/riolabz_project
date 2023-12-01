const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyparser=require("body-parser");



const user=require("../Models/user")


exports.userSignup=async(req,res)=>{
    console.log("In user Signup");
    try{
        const data=await user.create(req.body);
        if(!data){
            res.status(500).json({message:"Signup Failed"})
        }
        req.session.user={
            email:req.body.email,
            userType:'user'
        }
        return res.status(200).json({message:"Signed up succesfully"})
    }catch(error){
        console.log(error);
        res.status(200).json({message:"Signup Failed"})

    }
}

exports.userLogin=async(req,res)=>{
    console.log("In user Login");
    try{
        const data=await user.findOne({$and:[{email:req.body.email,passwd:req.body.passwd}]})
        if(!data){
            res.status(500).json({message:"email id or password is incorrect"})
        }
        console.log(data)
        req.session.user={
            
            email:req.body.email,
            userType:'user'
        }
        return res.status(200).json({message:"Login Succesfull"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"email id or password is incorrect"})
    }
}

exports.userEdit=async(req,res)=>{
    if(req.session.user.email==req.body.email){
    console.log("In Edit User");
    try{
        const data=await user.updateOne({email:req.body.email},{name:req.body.name})
        if(!data){
            res.status(500).json({message:"Unable to update details"})
        }
        return res.status(200).json({message:"Succesfully updated"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Unable to update details"})
    }
}else{
    console.log("Please login first");
    res.status(401).json({message:"Please login first"})
}
}


