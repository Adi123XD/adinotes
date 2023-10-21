const mongoose = require('mongoose');
console.log("mongoose");
const mongoURI="mongodb://127.0.0.1:27017/myDatabase";
const connectToMongo=async ()=>{
    await mongoose.connect(mongoURI)
    console.log("Connected successfully...");
}

module.exports=connectToMongo;
