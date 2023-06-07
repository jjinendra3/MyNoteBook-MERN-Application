const express=require('express');
const User=require("../models/User");
const bcrypt=require('bcryptjs')
const {body,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')
//Connecting of the schema of user made in models by routes....Capital U
const router=express.Router();

const JWT_KEY="Hello-JJ-123";//signing of the jw token which will authenticate the server whether or not a change is made to the toke, this jwt is actually used to help the user by not asking login details all the time and actually creating a specific token on a specific device and lettinh the client in whenver they acces the website.


// ROUTE 1: Creating a user using POST:api/auth/createuser , NO Log in req.


router.post('/createuser',[
    body("name","Enter a valid name of minimum 5 characters.").isLength({min:5}),//express validator checks the functions given
    body("email","The format should be that of an email.").isEmail(),
    body("password","Enter a valid password of minimum 5 characters.").isLength({min:5})
    //req here is requesting the user for content
    //response is the content we want to deliver to the user, we can also take the req then send it as response.
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
        res.status(500).send("There is an error while creating user")
      }
});
//Creating a User Ends Here

//ROUTE 2: Log in of User /api/auth/login
router.post('/login',[
  body("email","Please enter a valid mail_ID.").isEmail(),
  body("password","Please enter the password.").exists()
  ],async (req,res)=>{
    const errors = validationResult(req);//validates the input
    if (!errors.isEmpty()) {//checks the input for errors
      return res.status(400).json({ errors: errors.array() });}//returns the inputs with errors, dowsnt bother the server.
      const {email,password}=req.body;//this is just destructuring the elements of req.body to avoid writing req.body again and again, now email and password can be used as a variable as it is.
      try {
        let user=await User.findOne({email});
        if(!user){
          return res.status(401).json({error:"Please enter correct credentials!"});
        }
        let passCheck=await bcrypt.compare(password,user.password);
        
        if(!passCheck){
          return res.status(401).json({error:"Please enter correct credentials!"});
          
        }
        const data={//if you have come here it means that you have succesfully giventhe correct credentials.
 
          user://this is the user variable that is created to store the variables
          {
            id:user.id//uses the id in db entries which is unique to all the entries.
          }
        };
        const AuthToken=jwt.sign(data,JWT_KEY);
        res.json({AuthToken});// will send the jwt of the user we logged in, should be the same that was genrated when we created the client's account!

      } catch (error) {
        console.error(error.message);// Any generalized error if there is
        res.status(500).send("There is an error while logging in")
      }
  });
  //Login Route complete

  //ROUTE 3: Getting user of  of User /api/auth/getuser Login is required to identify the user.
  //will be done through jwt token that will be passed to fetchuser which will decrypt the token and give the concerned id
  router.post('/getuser',fetchuser,async (req,res)=>{
      try {
        const userId=req.user.id;//the userid given by fetchuser
        const user=await User.findById(userId).select('-password');//taking the entire details except password
        res.send(user);// sending as response to the client
      } catch (error) {
        console.error(error.message);// Any generalized error if there is
            res.status(500).send("There is an error while fetching user details")
      }
    })

module.exports=router