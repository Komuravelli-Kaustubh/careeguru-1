const mongoose=require('mongoose');


const userDetailsschema= new mongoose.Schema({
    UserName:{
        required:true,
        type:String,
        unique:true
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

mongoose.model("details",userDetailsschema);