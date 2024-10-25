const mongoose= require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");
const { init } = require("passport");
const mongo_url="mongodb://127.0.0.1:27017/Wanderlust";
main().then(()=>{
    console.log("conected to Data base")
})
.catch((err)=>{
    console.log(err);

})

// for data base we write a new async function
async function main(){
    await mongoose.connect(mongo_url)
}

const initDb = async()=>{
    await listing.deleteMany({});
  initData.data= initData.data.map((obj)=>({...obj,owner: "670cabd424afc08bd74b74ab"})) // new property add kr rhe hai owner ko add krne ke liye new array mei 
    await listing.insertMany(initData.data);
    console.log("data was initialize")
}
initDb();
