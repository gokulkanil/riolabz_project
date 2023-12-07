const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const bcrypt=require("bcrypt")



const user=require("../Models/user")


exports.userSignup=async(req,res)=>{
    console.log("In user Signup");
    try{
        const existinguser= await user.findOne({email:req.body.email})
        if(!existinguser){
         const saltRounds=10;
         const encryptedpasswd= await bcrypt.hash(req.body.passwd, saltRounds);   
        const data=await user.create({email:req.body.email,passwd:encryptedpasswd,name:req.body.name});
        if(!data){
            res.status(500).json({message:"Signup Failed"})
        }
        req.session.user={
            email:req.body.email,
            userType:'user'
        }
        return res.status(200).json({message:"Signed up succesfully"})
    }else{
        console.log("This email id is already exists in our system")
        return res.status(500).json({message:"email id already exists in our system"})
    }
    }catch(error){
        console.log(error);
        res.status(200).json({message:"Signup Failed"})

    }
}

exports.userLogin=async(req,res)=>{
    console.log("In user Login");
    const saltRounds=10;
    const encryptedpasswd= await bcrypt.hash(req.body.passwd, saltRounds);
    try{
        const data=await user.findOne({email:req.body.email})
        if(!data){
            return res.status(500).json({message:"email id doesn't exist"})
        }
        const passwordmatch= await bcrypt.compare(req.body.passwd,data.passwd)
        if(passwordmatch){
        console.log(data)
        req.session.user={
            
            email:req.body.email,
            userType:'user'
        }
        return res.status(200).json({message:"Login Succesfull"});
    }else{
        console.log("Wrong Password");
        res.status(401).json({message:"Wrong password"})
    }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong, please try again"})
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


