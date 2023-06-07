//This is a function that will be called before getuuser route starts the wrk, it will take token provided as header then convert it into user id using verify after which the user id will be sent to the getuser main function in auth.js using req.user which now has the decrypted ID and sends to main function using next....
var jwt=require("jsonwebtoken");
const JWT_KEY="Hello-JJ-123";
const fetchuser=async (req,res,next)=>{
    //Get the user details and token and then send the token with every request for authentication
    const token=req.header('auth-token');//creation of header
    if(!token){
        res.status(402).json({error:"Authorization token is invalid or not provided."})
    }
    const data= await jwt.verify(token,JWT_KEY);//descrypting jwt to id
    
    if(!data){
        
        res.status(403).json({error:"The user doesn't exist."})
        
    }
    req.user=data.user;//sending the decrypted id to getuser main funcin auth.js
    next();
}
module.exports=fetchuser