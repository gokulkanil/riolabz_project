const express=require("express");
const app=express();
const router=express.Router

const adminController=require("../Controllers/adminController.js")

app.post("/adminSignup",adminController.adminSignup)
app.post("/adminLogin",adminController.adminLogin)
app.get("/viewUserList",adminController.viewUserList)
app.post("/addUsertoAdmin",adminController.addUsertoAdmin)
app.post("/addItem",adminController.addItem)

console.log("adminRouter Connected");
module.exports=app