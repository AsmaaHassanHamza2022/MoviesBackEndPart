const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const controller=require('../Controllers/authController');

//loginRouter
router.post("/login",
[body("Email").isEmail().withMessage("Invalid Email")]
,controller.login);

//RegisterRouter
router.post("/register",
[
 body("First_name").isAlpha().withMessage("fisrt name should be string"),
 body("Last_name").isAlpha().withMessage("last name should be string"),
 body("Email").isEmail().withMessage("Please Enter Valid Email"),
 body("Password").isAlphanumeric().withMessage("password should be string and number").isLength({min:5}).withMessage("paswword should at least contains 5 letters"),
//  body("ConfirmtionPassword").custom((value, { req })=>{
//     if (value !== req.body.Password) {
//         throw new Error('Password confirmation does not match password');
//       }
//       return true;
// }),
]
,controller.register);
module.exports=router;