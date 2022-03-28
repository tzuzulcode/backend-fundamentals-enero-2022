const path = require("path")
const express = require("express")
const morgan = require("morgan")
const expressLayouts = require('express-ejs-layouts')
const { port } = require("./config")
const {connection} = require("./config/database")

const db = require("./models/index")

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

// Test connection
connection()

app.get("/",async function(req,res){

    let result = await db.User.create({
        name:"Tzuzul Code",
        username:"tzuzulcode",
        email:"mail@tzuzulcode.com",
        birthday:"1998-05-10",
        password:"12345",
        profilePic:"https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      })
    
      console.log(result)

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