const express=require("express");
const app=express();
const router=express.Router

const menuController=require("../Controllers/menuController")

app.get("/viewMenu",menuController.viewMenu)

console.log("menuRouter connected");
module.exports=app;