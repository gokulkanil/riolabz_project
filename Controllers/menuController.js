const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyparser=require("body-parser");

const menu=require("../Models/menu");

exports.viewMenu=async(req,res)=>{
    console.log("In view Menu");
    try{
        const data=await menu.find();
        if(!data){
            console.log("No items")
            res.status(500).json({message:"No items found"})
        }
        console.log(data)
        return res.status(200).send(data)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"unable to fetch the menu"})
    }
}