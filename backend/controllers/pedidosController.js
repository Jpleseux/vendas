const mongoose = require("mongoose");
const pedidostsModel = require("../models/pedido");
const produtsModel = require("../models/produts");
const calculate = require("../utils/aggregation")
const calculatePayment = require("../utils/calculateOrder")
const getFrete = require("../utils/getFrete")

const cupons = [
    {
      cupom:{
        code: 12345678,
        discount: 30,
        validate: new Date("2023-06-05")
      },
      cupom:{
        code: 87654321,
        discount: 15,
        validate: new Date("2022-06-05")
      },
      cupom:{
        code: 99781384,
        discount: 50,
        validate: new Date("2023-09-05")
      }
    }
];
function validateCupon(cod) {
  let cupomEncontrado = false;
  const validCupom = {}
  
  for (let i = 0; i < cupons.length; i++) {
    const cupom = cupons[i];
    for (let key in cupom) {
      if (cupom[key].code === cod) {
        cupomEncontrado = true;
        validCupom[key] = cupom[key]
        break; 
      }
    }
    
    if (cupomEncontrado) {
      break; 
    }
  }
  
  if (cupomEncontrado) {
    const atual = new Date
    if(validCupom.cupom.validate < atual.getTime()) return false;

    return validCupom;
  } else {
    return false;
  }
}



async function produtExist(id) {
  try {
    const produt = await produtsModel.findById(id);
    if (!produt) {
      return false;
    }
    
    return produt;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const pedidosController = {
  create: async (req, res) => {
    const produtsId = req.body.produts;
    const cpf = req.body.cpf
    const validateCpf = require("../utils/validationCpf")
    const isValidCpf = await validateCpf(cpf)

    if(isValidCpf ===false){
      res.status(401).json({msg: "Cpf inválido"})
    }
    const Pedido = { produts: [] };

    for (const produtIdObj of produtsId) {
      const produtId = produtIdObj.id;
      const isProdut = await produtExist(produtId);
      
      if (isProdut === false) {
        return res.status(404).json({ msg: "Produto não encontrado!!!" +produtId});
      }
      
      const quantidadeItens = produtIdObj.quantidade;

      const produtData = {
        produtId: produtId,
        quantidade: quantidadeItens
      };

      Pedido.produts.push(produtData);
    }

    await pedidostsModel.create(Pedido);
    res.status(201).json({ msg: "Pedidos cadastrado com sucesso" });
  },
  addCoupon:async (req, res)=>{

    const cupom = req.body.cupom
    const id = req.params.id

    isCupomExist = await validateCupon(cupom)
    isPedidoExist = await pedidostsModel.findById(id);
    if(isPedidoExist ===false) return res.status(301).json({msg:"Pedido não existe"});
    if(isCupomExist === false){
      return res.status(400 ).json({msg: "O cupom não existe ou esta expirado"})
    }
    await pedidostsModel.findByIdAndUpdate(id, isCupomExist)

    res.status(200).json({msg:"tudo certo"})
  },
  payment:async (req, res) =>{
    const id = req.params.id

    isPedidoExist = await pedidostsModel.findById(id);
    const desconto = isPedidoExist.desconto.discount
    
    const payment = await calculatePayment(id)
    if(desconto) payment = payment - desconto;
    const frete = getFrete(id);
    res.status(201).json({msg: `Pedido pago com sucesso o valor total foi de ${payment}`})
  },
  getFrete: async (req, res)=>{
    const id = req.params.id;
    const frete = await getFrete(id);
    if(frete ===false)res.status(400).json({msg: "Pedido não encontrado"});

    res.status(201).json({msg:`O frete previsto é de: ${frete}`})
  },
  getOne: async (req, res)=>{
    const id = req.params.id;

    const find = await pedidostsModel.findOne({_id: id}).lean();

    if(!find || find === null ||find ===undefined){
      res.status(400).json({msg:"Erro ao encontrar o produto"});
    };
    res.status(201).json({msg: `Pedido encontrado, o ID do produto é: ${find._id}`})
  },
  getAll: async (req, res)=>{
    const pedidosId =[]
    const find = await pedidostsModel.find().lean();
    let i = 0
    for(const Ids of find){
      i  +=1
      pedidosId.push(`pedido ${i}: ${Ids._id}`);
    }

    res.status(200).json({msg:pedidosId})
  }
};

module.exports = pedidosController;
