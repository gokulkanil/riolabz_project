const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const bodyparser=require("body-parser");
const session=require("express-session");
const userRouter=require("./Routers/userRouter");
const adminRouter=require("./Routers/adminRouter")
const menuRouter=require("./Routers/menuRouter")



const PORT=process.env.PORT||5000
dotenv.config();
const connectDB=require("./Config/db")

connectDB();

app.use(session({
    secret: 'rio',
    resave:false,
    saveUninitialized:true
}))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/menu",menuRouter)



app.listen(PORT,()=>console.log("listening on port:"+PORT))