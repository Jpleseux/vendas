const calculate = require("./aggregation")
const PedidoModel = require("../models/pedido")

async function calc(id){
    const valorBruto = await calculate()
    const pedido = await PedidoModel.findById(id)
    const desconto = await pedido.desconto.discount
    if(!desconto){
        return valorBruto
    }
    const valorTotal = valorBruto - desconto
    return valorTotal
}

module.exports = calc