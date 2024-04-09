const express=require("express")
const {handleAnalyticsOfURL,handleRedirectUrl,generateNewShortUrl}=require("../controllers/urlControllers.js")
const urlRoutes = express.Router()



urlRoutes.post("/",generateNewShortUrl)
urlRoutes.get("/:id",handleRedirectUrl)
urlRoutes.get("/analytics/:id",handleAnalyticsOfURL)







module.exports=urlRoutes