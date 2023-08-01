const router = require("express").Router()

const pedidosController = require("../controllers/pedidosController")

router.route("/create").post((req, res)=>pedidosController.create(req,res))
router.route("/addcupon/:id").patch((req, res)=>pedidosController.addCoupon(req, res))
router.route("/payment/:id").post((req, res)=>pedidosController.payment(req, res))
router.route("/getfrete/:id").get((req, res)=>pedidosController.getFrete(req,res))
router.route("/getone/:id").get((req, res)=>pedidosController.getOne(req, res))
router.route("/getall/").get((req, res)=>pedidosController.getAll(req, res))
module.exports = router