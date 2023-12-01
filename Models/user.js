const mongoose=require("mongoose");
const schema=mongoose.Schema


const userSchema=new schema({
    name:'String',
    email:'String',
    passwd:'String'

},{timestamps:true});

const user=mongoose.model("user",userSchema)
module.exports=user;