const express = require("express")

require("dotenv").config()

const cors = require("cors")

//express definition
const app = express()

port = 3000

//middleweres
app.use(cors())
app.use(express.json())

//db connection
const connection = require("./db/connection")
connection();


app.listen(port, ()=>{
    console.log(`Server is runing in port: ${port}`)
})