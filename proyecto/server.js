const express = require('express')

const app = express()

// Procesos intermedios
// Middleware
app.use(express.text()) // Cada vez que se haga uso de la app, se ejecute express.text()
app.use(express.json()) // Cada vez que se haga uso de la app, se ejecute express.json()


app.get('/',function(peticion,respuesta){
    return respuesta.send("Pagina principal")
})

app.get('/saludo',function(peticion,respuesta){
    return respuesta.send("Hola mundo")
})
app.get('/adios',function(peticion,respuesta){
    return respuesta.send("Adios mundo")
})
app.post('/saludo',function(peticion,respuesta){
    const nombre = peticion.body
    const mensaje = "Petición post. Hola, "+nombre
    return respuesta.send(mensaje)
})
app.post('/saludo_json',function(peticion,respuesta){
    const persona = peticion.body
    const mensaje = "Petición post. Hola, "+persona.nombre
    return respuesta.send(mensaje)
})

app.listen(4000,function(){
    console.log("Funcionando... http://localhost:4000")
})