const pedidoModel = require("../models/pedido");
const produtsModel = require("../models/produts");

async function calculateFrete(id){
    const response = await produtsModel.findById(id);

    const volume = (response.medidas.altura * response.medidas.profundidade * response.medidas.largura)/1000000

    const densidade = response.medidas.peso/volume

    const frete = (1000 * volume * (densidade/100))

    const result = frete <10 ? 10 : frete;

    return result
}

async function main(id){
    const fretes = [];
    let  valorTotal = 0
    const response = await pedidoModel.findById(id);
    console.log(response)
    if(!response || response === null || response === undefined) return false;

    const products = response.produts;

    for(let produt in products){
        fretes.push(await calculateFrete(products[produt].produtId));
    };
    for(let frete in fretes){
        valorTotal = valorTotal + fretes[frete];
    };
    return valorTotal
};

module.exports = main;