const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/dynamicwebsite").then(()=>{
    console.log("Connection Successfully");
}).catch((error)=>{
    console.log(error);
});