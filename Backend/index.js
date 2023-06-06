const mongoose=require('mongoose');
const express = require('express');
const mongoURI="mongodb://0.0.0.0:27017/mynotebook";
const ConnecttoMongoDB=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Sucess!");
    })
}
ConnecttoMongoDB();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:3000`)
})