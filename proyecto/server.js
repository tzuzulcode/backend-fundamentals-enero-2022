const express = require('express')
const path = require("path")
//const views = path.join(__dirname,'views/')

function views(document){
    return path.join(__dirname,"views",document)
}

// Desestructurando el objeto que se exporta en database
// Extraer los metodos del objeto database
const database = require('./database')

const app = express()

// Procesos intermedios
// Middleware
//Convirtiendo el body de la petición
app.use(express.text()) // Cada vez que se haga uso de la app, se ejecute express.text()
app.use(express.json()) // Cada vez que se haga uso de la app, se ejecute express.json()
app.use(express.urlencoded({extended:true})) // Cada vez que se haga uso de la app, se ejecute express.urlencoded()


app.get('/',function(peticion,respuesta){
    // return respuesta.send(`
    //     <h1>Pagina principal</h1>
    //     <img src="https://images.unsplash.com/photo-1643937583754-ee8aa3d5ccd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
    // `)
    //Ruta absoluta
    //return respuesta.sendFile("/Users/tzuzul/Developer/BackEndFundamentalsEnero2022/proyecto/views/index.html")
    
    // console.log(__dirname)
    // Podemos obtener el path
    //return respuesta.sendFile(__dirname+'/views/index.html')
    
    // Podemos obtener el path con join
    return respuesta.sendFile(views("index.html"))
})

app.get('/registro',function(request,response){
    return response.sendFile(views("registro.html"))
})
app.post('/registro',async function(request,response){
    console.log(request.body) // {name: 'Tzuzul Code',email: 'mail@tzuzulcode.com',birthday: '2022-02-07'}
    const persona = request.body
    const results = await database.insert('users',persona)
    console.log(results)
    // Nos lleva luego a la página principal
    return response.redirect("/")
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

// Edgar Montiel
// Stiward
// MVC