const express=require('express');
const User=require("../models/User");
const {body,validationResult}=require('express-validator');
//Connecting of the schema of user made in models by routes....Capital U
const router=express.Router();
// Creating a user suing POST:api/auth , this fucntion doesnt reuqire authentiction(logging in)
//req here is requesting the user for content
//response is the content we want to deliver to the user, we can also take the req then send it as response.
//using post instead of get
router.post('/',[
    body("name","Enter a valid name of minimum 5 characters.").isLength({min:5}),//express validator checks the functions given
    body("email","The format hsould be that of an email.").isEmail(),
    body("password","Enter a valid password of minimum 5 characters.").isLength({min:5})
],(req,res)=>{
    const errors = validationResult(req);//validates the input
    if (!errors.isEmpty()) {//checks the input for errors
      return res.status(400).json({ errors: errors.array() });}//if error found
      User.create({//Big U which is imported
          name:req.body.name,
          email:req.body.email,
          password:req.body.password
        }).then(user=>res.json(user)).catch(err=>{res.json({error:"This email is already registered!",message:err.message})})//sends the whole entry that has been creted as the content response, includes date and id also so the same thing actually goes into the db
        //small u in user=> becuase it is used as  a variable to hold values for a temporary time   
})
module.exports=router