const express=require('express');
const User=require("../models/User");
const bcrypt=require('bcryptjs')
const {body,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken')

const JWT_KEY="Hello-JJ-123";//signing of the jw token which will authenticate the server whether or not a change is made to the toke, this jwt is actually used to help the user by not asking login details all the time and actually creating a specific token on a specific device and lettinh the client in whenver they acces the website.

//Connecting of the schema of user made in models by routes....Capital U
const router=express.Router();

// Creating a user using POST:api/auth/createuser , NO Log in req.

//req here is requesting the user for content
//response is the content we want to deliver to the user, we can also take the req then send it as response.
//using post instead of get
router.post('/createuser',[
    body("name","Enter a valid name of minimum 5 characters.").isLength({min:5}),//express validator checks the functions given
    body("email","The format should be that of an email.").isEmail(),
    body("password","Enter a valid password of minimum 5 characters.").isLength({min:5})
],async (req,res)=>{

    const errors = validationResult(req);//validates the input
    if (!errors.isEmpty()) {//checks the input for errors
      return res.status(400).json({ errors: errors.array() });}//if error found

     try{
      let user=await User.findOne({email:req.body.email});//finding if the email provided exists
      
      if(user){
        return res.status(400).json({error:"A user with this email already exists!"});
      }//used to generate readable error on lack of unique email id

      const salt=await bcrypt.genSalt(10);//Generation of Salt to be added to the pw
      const Pass= await bcrypt.hash(req.body.password,salt);// hashing of password and salt mixed

      //used await because both up and down these are actually promise returning functions so we have to wait till they give an output post which we want things to resume

      user=  await User.create({//Big U which is imported
          name:req.body.name,
          email:req.body.email,
          password:Pass
        })
        //sends the whole entry that has been creted as the content response, includes date and id also so the same thing actually goes into the db

        //small u in user=> becuase it is used as a variable to hold values for a temporary time  
     
        const data={//this is used for jwt 
          user://this is the user variable that is created to store the variables
          {
            id:user.id//uses the id in db entries which is unique to all the entries.
          }
        };
        const AuthToken=jwt.sign(data,JWT_KEY);// so the jwt is creted by mixing the id of entry, the secret key and is converted to token which is unique for all the users.... Remarkable Technology!!

        res.json({AuthToken})// a jwt is processed which is unique for all the user 
        

      }catch(error){
        console.error(error.message);// Any error apart from the specific email thing
        res.status(500).send("There is an error")
      }
});
module.exports=router