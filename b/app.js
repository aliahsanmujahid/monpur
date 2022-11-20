const express = require("express");
const dbCreate = require("./routes/dbcreate");
const userRouter = require("./routes/user");
const path = require('path');
require("dotenv").config();
const cors = require("cors");
const bodyparser = require("body-parser");



const app = express();
app.use(cors());

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join('images')));
app.use(express.static(path.join(__dirname,'dist')));

  
app.use("/api/user", userRouter);
app.use("/db", dbCreate);
app.get("*", function(req,res){
    res.sendFile(path.join(__dirname,'dist', 'index.html'))
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
  
  