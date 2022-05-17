const {validationResult}=require("express-validator");
const jwt = require('jsonwebtoken');
const mongoose=require("mongoose")
let User=require("../Models/userModel");

// generate the token

function generateAccessToken(username) {
    return jwt.sign(username, 'secret', { expiresIn: '1800s' });
  }

//login controller
exports.login=(request,response,next)=>{
    
    let result=validationResult(request);
    if(!result.isEmpty()){
        let error=new Error();
        error.status=422;
        error.message=result.array().reduce((total,current)=>total+current.msg+" , ","");
        next(error);
    }
    else{
        User.findOne({Email:request.body.Email})
            .then(result=>{
                if(result.Password==request.body.Password){
                   
                  
                    response.status(201).json({message:"Success",
                    data:
                    {
                    "First_name":result.First_name,
                    "Last_name":result.Last_name,
                    "Email":result.Email,
                    "Password":result.Password
                },
                    Token:result.Token});
                }
                else{
                    response.status(201).json({message:"invalid password"})
                }
            })
            .catch(error=>{
                console.log(request.body.Email)
                response.status(201).json({message:"email not found"})
            })
    }

}
//register controller
exports.register=(request,response,next)=>{

    let result=validationResult(request);
    
    if(!result.isEmpty()){
        let error=new Error();
        error.status=422;
        error.message=result.array().reduce((total,current)=>total+current.msg+" , ","");
        next(error);
    }else{
        const token = jwt.sign(
            {
                    First_name:request.body.First_name,
                    Last_name:request.body.Last_name,
                    Email:request.body.Email,
                    Password:request.body.Password,
             },
            'secret',
            {
              expiresIn: "2h",
            }
          );


                let userObject=new User({
                    First_name:request.body.First_name,
                    Last_name:request.body.Last_name,
                    Email:request.body.Email,
                    Password:request.body.Password,
                    Token:token
                   
                });
                console.log(userObject);
                userObject.save()
                .then((result)=>{
                    response.json({massage:"Register Successfully"})
            })
                .catch((error)=>{error.status=500;next(error)});


  
}}
           