const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const bcrypt=require("bcrypt");

const admin=require("../Models/admin")
const user=require("../Models/user")
const menu=require("../Models/menu")

exports.adminSignup=async(req,res)=>{
    console.log("In admin Signup");
    try{
        const existingadmin= await admin.findOne({email:req.body.email})
        if(!existingadmin){
            const saltRounds=10;
            const encryptedpasswd= await bcrypt.hash(req.body.passwd, saltRounds);
            const data=await admin.create({email:req.body.email,passwd:encryptedpasswd,name:req.body.name});
        if(!data){
            res.status(500).json({message:"Signup Failed"})
        }
        req.session.admin={
            email:req.body.email,
            userType:'admin'
        }
        return res.status(200).json({message:"Signed up succesfully"})
    }else{
        console.log("Email id exists")
        return res.status(401).json({message:"email id already exists"})
    }
    }catch(error){
        console.log(error);
        res.status(200).json({message:"Signup Failed"})

    }
}

exports.adminLogin=async(req,res)=>{
    console.log("In admin Login");
    const saltRounds=10;
    const encryptedpasswd= await bcrypt.hash(req.body.passwd, saltRounds);
    try{
        const data=await admin.findOne({email:req.body.email})
        if(!data){
            return res.status(500).json({message:"email id doesn't exists"})
        }
        const passwordmatch= await bcrypt.compare(req.body.passwd,data.passwd)
        if(passwordmatch){
        console.log(data)
        req.session.admin={
            email:req.body.email,
            userType:'admin'
        }
        return res.status(200).json({message:"Login Succesfull"});
    }else{
        console.log("Wrong password");
        return res.status(401).json({message:"wrong password"})
    }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"something went wrong, please try again"})
    }
}

exports.viewUserList=async(req,res)=>{
    if(req.session.admin){
    console.log("In View User List");
    try{
        const data=await user.find();
        if(!data){
            res.status(500).json({message:"unable to fetch list"})
        }
        console.log(data)
        return res.status(200).send(data)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"unable to fetch list"})
    }
}else{
    console.log("This page can be accessed by admins only");
    res.status(401).json({message:"This page can be accessed by admins only"})
}
}

exports.addUsertoAdmin=async(req,res)=>{
    if(req.session.admin){
    console.log("In adding user to admin operation");
    try{
        const data=await user.findOne({email:req.body.email})
        if(!data){
            console.log("User doesn't exist")
            return res.status(500).json({message:"User doesn't exist"})
        }
        const existingadmin=await admin.findOne({email:data.email})
        if(!existingadmin){
        console.log(data);
        const emailf=data.email;
        const namef=data.name;
        const passwdf=data.passwd;
        data1=await admin.create({name:namef,email:emailf,passwd:passwdf});
        return res.status(200).json({message:"Admin access granted"})
        }else{
            return res.status(500).json({message:"This user already has admin access"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"unable to add this user to admin list"})
    }
}else{
    console.log("Please login as admin");
    res.status(401).json({message:"this page can be accessed by admins only"})
}
}

exports.addItem=async(req,res)=>{
    if(req.session.admin){
        console.log("In add Item")
        try{
            data=await menu.create(req.body)
            if(!data){
                console.log("Unable to add item")
                res.status(500).json({message:"Unable to add item"})
            }
            console.log(data);
            res.status(200).json({message:"Item added succesfully"})
        }
        catch(error){
            console.log(error)
            res.status(200).json({message:"Unable to add item"})
        }
    }else{
        console.log("Only admins can access this page")
        res.status(401).json({message:"Only admins can access this page"})
    }
}