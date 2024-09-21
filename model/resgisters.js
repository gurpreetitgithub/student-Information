const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    Rno:{
        type:String,
        reuired:true,
        unique:true
    },
    Tmarks:{
        type:String,
        required:true
    },
    perc:{
        type:String,
        required:true
    }

})

const Register = mongoose.model("data",userSchema);

module.exports = Register;