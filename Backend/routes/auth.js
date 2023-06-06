const express=require('express');
const User=require("../models/User");
//Connecting of the schema of user made in models by routes....Capital U
const router=express.Router();
// Creating a user suing POST:api/auth , this fucntion doesnt reuqire authentiction(logging in)
//req here is requesting the user for content
//response is the content we want to deliver to the user, we can also take the req then send it as response.
//using post instead of get
router.post('/',(req,res)=>{
    console.log(req.body);
    const user=User (req.body);
    user.save();
    //taking the content and saving
    res.send(req.body);
})
module.exports=router