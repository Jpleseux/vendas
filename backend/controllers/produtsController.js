const produtsModel = require("../models/produts");

const produtsController = {
  create: async (req, res) => {
    try {
      const medidas = req.body.medidas;

      for (const mes in medidas) {
        if (medidas[mes] < 0) {
          return res.status(400).json({ msg: "Medidas não podem ser negativas" });
        }
      }

      const currentYear = new Date().getFullYear().toString();
      const randomId = Math.floor(Math.random() * 10000).toString().padStart(8, '0');
      const id = currentYear + randomId;
      console.log(id)
      const produt = {
        _id: id,
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        descricao: req.body.descricao,
        produtName: req.body.produtName,
        medidas: {
          largura: req.body.medidas.largura,
          altura: req.body.medidas.altura,
          profundidade: req.body.medidas.profundidade,
          peso: req.body.medidas.peso
        }
      };

      await produtsModel.create(produt);

      return res.status(201).json({ msg: "Produto cadastrado com sucesso" });
    } catch (error) {
      res.status(400).json({ msg: "Erro ao cadastrar produto" + error });
    }
  }
};

module.exports = produtsController;
