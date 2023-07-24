
const mongoose = require("mongoose");
const {Schema}=mongoose
const NewUser= new Schema({
    UserName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }

})
const Users=mongoose.model("user",NewUser)
module.exports=Users    