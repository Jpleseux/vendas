const router =  require("express").Router()

const userController = require("../controllers/produtsController")

router.route("/create").post((req, res)=>userController.create(req, res))

module.exports = router