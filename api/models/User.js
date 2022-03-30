const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    img:{
        type: String
    }
},
    {
        timestamps:true
    }
    ,
    {
        collection:'user-data'
    }
)

module.exports = mongoose.model("User", UserSchema)