const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/logindb")
.then(()=>{
console.log("mongodb connected");

})
.catch(()=>{
    console.log("failed to connect");

})
