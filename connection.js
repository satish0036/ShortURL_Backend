const mongoose=require("mongoose")
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const connectToMongoDb=(url)=>{
mongoose.connect(url)
.then(()=>console.log("connected to DB"))
.catch((err)=>console.log(`error while connecting with Db ${err}`))
}

module.exports = connectToMongoDb;

