const express = require("express") 
const mongoose = require("mongoose");
const router = require("./route/user");
const PORT = 5000;
const blogRouter = require("./route/blog")

const jwt = require("jsonwebtoken")

const secretKey = "jbvieublvdubfvldfbvliufbvdufb";

const cors= require("cors");
const User = require("./modle/user");
const app = express();


app.use(cors());
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/blog")
.then(()=>console.log("MongoDB Connected"))

// app.get("/user", (req, res)=>{
//     return res.send("harash")
// })


app.get("/user/data", async (req,res)=>{
    const token = req.headers.authorisation;
   
    if(!token){
        return res.status(401).json({error:"Unautorized"});
    }
    try{
        const decoded = jwt.verify(token, secretKey);
        const {email , firstname,lastname} = await User.findOne({_id : decoded.userId});
        res.json({email : email,firstname,lastname:lastname})
    }catch(error){
        return res.status(401).json({message:"Invalid token"})
    }
})

app.use("/user",router)
app.use("/blog",blogRouter)
app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`))