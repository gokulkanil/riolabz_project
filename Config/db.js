const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        const uri="mongodb://127.0.0.1:27017/rioLabz";
        const conn=await mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("mongoDB connected");
    }catch(error){
        console.log(error);
    }
}

module.exports=connectDB;