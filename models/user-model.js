const mongoose= require("mongoose")
const schema= mongoose.Schema

const user= new schema ({

    username: { type: String },
    email: { type: String },
    name: { type:String },
    last_name: { type:String },
    password: { type: String },
    rol:{ type: String } ,
    status: { type: Number, default: 1 },
},
{ timestamps: true },

)
module.exports= mongoose.model('user', user)