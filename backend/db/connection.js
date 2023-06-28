const mongoose = require("mongoose")

async function main(){
    try {
        mongoose.set("strictQuery", true)

        mongoose.connect("mongodb+srv://joaopleseux:mm24~~92H@cluster0.mdxwgl9.mongodb.net/?retryWrites=true&w=majority")
    
        console.log("Connection success")
    } catch (error) {
        console.log(error)
    }
}
module.exports = main