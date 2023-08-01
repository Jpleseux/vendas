const Pedido = require("../models/pedido");
const Produts = require("../models/produts");

async function main() {
  try {
    const result = await Pedido.aggregate([
      {
        $unwind: "$produts"
      },
      {
        $lookup: {
          from: "produts",
          localField: "produts.produtId",
          foreignField: "_id",
          as: "produt"
        }
      },
      {
        $unwind: "$produt"
      },
      {
        $group: {
          _id: "$_id",
          ValorBruto: {
            $sum: {
              $multiply: ["$produt.valor", "$produts.quantidade"]
            }
          }
        }
      }
    ]);

    const valorTotal = result[0].ValorBruto;

    return valorTotal;
  } catch (error) {
    console.error(error);
  }
}

module.exports = main;
