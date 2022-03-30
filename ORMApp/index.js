const path = require("path")
const express = require("express")
const morgan = require("morgan")
const flash = require("connect-flash")
const expressLayouts = require('express-ejs-layouts')
const { port,secret } = require("./config")
const {connection} = require("./config/database")
const session = require("express-session")

//Importando rutas
const auth = require("./routes/auth")

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

//Definiendo la sesión
app.use(session({
    secret:secret,
    resave:false,
    saveUninitialized:false
}))

//Middleware de urlencoded
app.use(express.urlencoded({
    extended:true
}))

//Definiendo midd para flash messages
app.use(flash())

// Test connection
connection()

//Utilizando rutas
app.use("/auth",auth)

app.get("/",async function(req,res){
    console.log(req.session)
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

app.get("/flash",(req,res)=>{
    req.flash("exito","Completamente redireccionado")
    
    res.redirect("/pagina")
})

app.get("/pagina",(req,res)=>{
    return res.json({message:req.flash("exito")})
})

app.listen(port,()=>{
    console.log("Funcionando en: http://localhost:"+port)
})