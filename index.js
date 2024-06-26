const express=require("express");
const PORT=process.env.PORT || 8000;
const connectToMongoDb =require("./connection.js")
const urlRoutes=require("./routes/urlRouters.js")
const homeRoutes=require("./routes/homeRoutes.js")
const dotenv=require("dotenv")
const cors=require("cors")
dotenv.config();

connectToMongoDb(process.env.DB_DATABASE)


const app=express()


app.use(cors({
    origin: ['http://localhost:3000','https://shorturl.indiaarticle24.com'],
    credentials: true,
  }));


app.use(express.json())

app.use("/",homeRoutes)
app.use("/url",urlRoutes)




app.listen(PORT,()=>console.log("connected to backend"))