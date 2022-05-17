const express =require("express");
const bodyParser=require("body-parser");

var cors = require('cors')
const mongoose=require("mongoose");

const server=express();


const authRouter=require('./Routes/authRouter');

server.use(cors())

//1- openinign DB Connection & node server


mongoose.connect("mongodb://localhost:27017/MoviesAuthDB")
        .then(()=>{
                console.log("DB Connected");
                server.listen(process.env.PORT||8080,()=>{
                    console.log("I am listening ......")
                });
                
        })
        .catch(error=>{
            console.log(error);
                console.log("DB Conection Problem");

        });

//************************* MiddleWares */
//first-MW
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});


// middle ware to handle reqestBody
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(authRouter);


//------------------------- Error MW
server.use((error,request,response,next)=>{
    error.status=error.status || 500;
    response.status(error.status).send("Error Page "+ error);

})

