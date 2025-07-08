const mongoose=require("mongoose");

var userSchema= new mongoose.Schema({
 RIG:{
        type: String,
        required: [true, "User ID is required"]
    },
password: {
        type: String,
        required: [true, "Password is required"]
    }
})

const UserDB= mongoose.model('userDB', userSchema);

module.exports = UserDB;