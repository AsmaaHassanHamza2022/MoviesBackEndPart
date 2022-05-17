const mongoose=require('mongoose');

const {Schema,model}=mongoose;

const userModel=new Schema({
    
    First_name:String,
    Last_name:String,
    Email:{type:String,required:true,unique:true},
    Password:String,
    Token: { type: String },
    
   
})
module.exports=model("users",userModel);