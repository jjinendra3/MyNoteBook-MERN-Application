const ConnecttoMongoDB = require("./db");
const express = require("express");
var cors=require('cors');

ConnecttoMongoDB();
const app = express();
const port = 5000; //React will run on 3000
//used to get content from the user.....
app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));

app.use("/api/notes", require("./routes/notes"));
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`mynotebook listening on port http://localhost:5000`);
});
