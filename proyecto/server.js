const express = require('express')

const app = express()

app.get('/saludo',function(peticion,respuesta){
    return respuesta.send("Hola mundo")
})
app.get('/adios',function(peticion,respuesta){
    return respuesta.send("Adios mundo")
})
app.post('/saludo',function(peticion,respuesta){
    return respuesta.send("Petición post. Hola")
})

app.listen(4000,function(){
    console.log("Funcionando... http://localhost:4000")
})