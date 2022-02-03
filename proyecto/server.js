const express = require('express')
// Desestructurando el objeto que se exporta en database
// Extraer los metodos del objeto database
const database = require('./database')

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
    const miRespuestaJSON = {
        "saludo":mensaje,
        "datos":persona
    }
    return respuesta.json(miRespuestaJSON)
})

app.post('/registrar_usuario',async (request,response)=>{
    const persona = request.body
    const results = await database.insert('users',persona)
    return response.json(results)
})

app.post('/eliminar_usuario',async (request,response)=>{
    const persona = request.body.id
    const results = await database.del('users',persona)

    return response.json(results)
})

app.post('/editar_usuario',async (request,response)=>{
    const id = request.body.id
    const user = request.body.user
    const results = await database.query("UPDATE users SET ? WHERE id=?",[user,id])

    return response.json(results)
})

app.get('/mostrar_usuarios',async (request,response)=>{
    //Otra forma de gestionar promesas
    try{
        const results = await database.query('SELECT * FROM users')
        return response.json(results)
    }catch(error){
        return response.json(error)
    }
    
    // query('SELECT * FROM users')
    // .then((results)=>{
    //     console.log(results)
    //     return response.json(results)
    // })
    // .catch((error)=>{
    //     return response.json(error)
    // })
})

app.listen(4000,function(){
    console.log("Funcionando... http://localhost:4000")
})