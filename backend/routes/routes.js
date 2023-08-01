const router = require("express").Router()

const produtsRoute = require("./produtsRoute")

const pedidosRoute = require("./pedidoRouter")

router.use("/produtos", produtsRoute)

router.use("/pedidos", pedidosRoute)

module.exports = router