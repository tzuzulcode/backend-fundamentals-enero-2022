const express = require("express")
const { port } = require("./config")
const {query} = require("./config/database")
const {engine} = require("express-handlebars")

const app = express()

app.engine('handlebars',engine())
app.set("view engine",'handlebars')
app.set("views","views")

app.get("/",async (req,res)=>{
    const users = await query("SELECT * FROM users")
    return res.json(users)
})

app.listen(port,function(){
    console.log("Funcionando... http://localhost:"+port)
})