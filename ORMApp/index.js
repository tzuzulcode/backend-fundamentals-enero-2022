const path = require("path")
const express = require("express")
const morgan = require("morgan")
const expressLayouts = require('express-ejs-layouts')
const { port } = require("./config")

const app = express()

// Usando registros con Morgan
app.use(morgan("dev"))


//Definiendo middleware layouts
app.use(expressLayouts)

//Archivos estáticos
app.use(express.static(path.join(__dirname,"static")))

// Usando view engine
app.set("view engine","ejs")
app.set('layout', './layouts/base')

app.get("/",function(req,res){
    res.render("index",{
        saludo:"Hola, personas",
        personas:[
            {
                name:"Saul",
                age:20
            },
            {
                name:"Dalma",
                age:17
            },
            {
                name:"Manuel",
                age:25
            },
            {
                name:"Kat",
                age:15
            }
        ]
    })
})

app.listen(port,()=>{
    console.log("Funcionando en: http://localhost:"+port)
})