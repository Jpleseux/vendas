const mongoose = require("mongoose")
const {Schema} = mongoose;
const pedidoSchema = new Schema({
    quantidade: {
        type:Number,
        required:false
    },
    produts: [{
        _id: false,
        produtId:{
            type: Schema.Types.ObjectId,
            ref:"Produts",
            required: true
        },
        quantidade:{
            type:Number,
            required:true
        }
    }],
    desconto:[{
        _id: false,
        code: String,
        discount: String
    }]
})
const Pedido = mongoose.model("Pedido", pedidoSchema)
module.exports = Pedido