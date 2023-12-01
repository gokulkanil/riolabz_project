const mongoose=require("mongoose");
const schema=mongoose.Schema


const adminSchema=new schema({
    name:'String',
    email:'String',
    passwd:'String'

},{timestamps:true});

const admin=mongoose.model("admin",adminSchema)
module.exports=admin;