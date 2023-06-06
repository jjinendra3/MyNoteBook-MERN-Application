const mongoose=require('mongoose');
const mongoURI="mongodb://0.0.0.0:27017/mynotebook";
const ConnecttoMongoDB=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Sucess!");
    })
}
module.exports=ConnecttoMongoDB;