const express = require("express")
const path = require("path")
const UserController = require("../controllers/users")

function views(document){
    return path.join(__dirname,"../","views",document)
}
const router = express.Router()

// Definiendo el controlador
const userController = new UserController()

// Asignando middleware al router
//router.use('/users')

router.get('/registro',function(request,response){
    //return response.sendFile(views("registro.html"))
    return response.render("registro",{title:"Registro de usuarios"})
})

router.post('/registro',async function(request,response){
    //console.log(request.body) // {name: 'Tzuzul Code',email: 'mail@tzuzulcode.com',birthday: '2022-02-07'}
    const persona = request.body
    const user = await userController.create(persona)
    // Nos lleva luego a la página principal
    if(user.success){
        return response.redirect("/users")
    }else{
        return response.render("registro",{title:"Error en el registro",error:true,message:user.error,data:persona})
    }
})

router.get("/usersPug",async (req,res)=>{
    var users = await userController.readAll()
    return res.render("users",{usuarios:users,title:"Usuarios"})
})
router.get("/users",(req,res)=>{
    return res.sendFile(views("users.html"))
})
router.get("/editUser/:id",(req,res)=>{
    return res.sendFile(views("editUser.html"))
})
router.get("/api/users",async (req,res)=>{
    var users = await userController.readAll()
    return res.json(users)
})
router.get("/api/users/:id",async (req,res)=>{
    const id = req.params.id
    var user = await userController.read(id)
    return res.json(user)
})
router.delete("/api/users/:id",async (req,res)=>{
    const id = req.params.id
    var user = await userController.delete(id)
    var users = await userController.readAll()
    return res.json(users)
})
router.post("/api/editUser/:id",async (req,res)=>{
    const id = req.params.id
    var user = await userController.edit(id,req.body)
    return res.redirect("/")
})
router.delete("/api/users/:id",async (req,res)=>{
    const id = req.params.id
    var user = await userController.delete(id)
    var users = await userController.readAll()
    return res.json(users)
})
// Una alternativa mejor es usar el metodo static de express:
// router.get("/js/users.js",(req,res)=>{
//     return res.sendFile(path.join(__dirname,"../","static","js","users.js"))
// })
module.exports = router