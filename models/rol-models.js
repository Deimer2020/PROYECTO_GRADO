const mongoose= require("mongoose")
const schema= mongoose.Schema

const rol= new schema ({

    name: { type: String },
    description: { type:String },
    slug:{ type:String }
},
{ timestamps: true },

)
module.exports= mongoose.model('rol',rol)