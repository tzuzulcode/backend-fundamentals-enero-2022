const express = require('express')
const path = require("path")
//const views = path.join(__dirname,'views/')

//Importando las rutas:
const userRoutes = require("./routes/users")

function views(document){
    return path.join(__dirname,"views",document)
}

const app = express()

// Procesos intermedios
// Middleware
//Convirtiendo el body de la petición
app.use(express.text()) // Cada vez que se haga uso de la app, se ejecute express.text()
app.use(express.json()) // Cada vez que se haga uso de la app, se ejecute express.json()
app.use(express.urlencoded({extended:true})) // Cada vez que se haga uso de la app, se ejecute express.urlencoded()


//Utilizando las rutas
app.use(userRoutes)

app.get('/',function(peticion,respuesta){
    return respuesta.sendFile(views("index.html"))
})


app.listen(4000,function(){
    console.log("Funcionando... http://localhost:4000")
})