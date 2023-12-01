const mongoose=require("mongoose");
const schema=mongoose.Schema


const menuSchema=new schema({
    name:'String',
    category:schema.Types.Mixed

},{timestamps:true});

const menu=mongoose.model("menu",menuSchema)
module.exports=menu;