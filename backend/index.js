const express = require("express")

require("dotenv").config()

const cors = require("cors")

//express definition
const app = express()

port = 4000

//middleweres
app.use(cors())
app.use(express.json())

//db connection
const connection = require("./db/connection")
connection();
//routes
const routes = require("./routes/routes")

app.use("/api", routes)

app.listen(port, ()=>{
    console.log(`Server is runing in port: ${port}`)
})