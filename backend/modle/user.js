
const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true,
    },
   
    profileImageURL:{
        type:String,
        default:"/image/default.png",
    },
    role:{
        type:String,
        enum:["USER", "ADMIN"],
        default:"USER",
    },

},{timestamps:true})



const User = model("user", userSchema);

module.exports = User;