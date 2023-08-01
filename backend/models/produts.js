const mongoose = require("mongoose")

const {Schema} = mongoose

const produtSchema = new Schema({
    _id:{
        type: String,
        required:true,
        unique: true
    },
    valor: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required:true
    },
    produtName:{
        type:String,
        required: true
    },
    quantidade:{
        type: Number,
        required: true
    },
    medidas:{
        largura:{
            type:Number,
            required: true
        },
        altura:{
            type: Number,
            required: true
        },
        profundidade: {
            type: Number,
            required: true
        },
        peso:{
            type:Number,
            required:true
        }
    }
})

const produts =  mongoose.model("Produts", produtSchema)

module.exports = produts