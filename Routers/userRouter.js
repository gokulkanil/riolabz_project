const express=require("express");
const app=express();
const router=express.Router

const userController=require("../Controllers/userController.js")

app.post("/userSignup",userController.userSignup)
app.post("/userLogin",userController.userLogin)
app.post("/userEdit",userController.userEdit)

console.log("userRouter Connected");
module.exports=app