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
    return response.sendFile(views("registro.html"))
})

router.post('/registro',async function(request,response){
    //console.log(request.body) // {name: 'Tzuzul Code',email: 'mail@tzuzulcode.com',birthday: '2022-02-07'}
    const persona = request.body
    const user = await userController.create(persona)
    // Nos lleva luego a la página principal
    if(user.success){
        return response.redirect("/")
    }else{
        return response.redirect("/registro")
    }
})

router.get("/users",(req,res)=>{
    return res.sendFile(views("users.html"))
})
router.get("/api/users",async (req,res)=>{
    var users = await userController.readAll()
    return res.json(users)
})
router.delete("/api/users/:id",async (req,res)=>{
    const id = req.params.id
    var user = await userController.delete(id)
    return res.json(user)
})
// Una alternativa mejor es usar el metodo static de express:
// router.get("/js/users.js",(req,res)=>{
//     return res.sendFile(path.join(__dirname,"../","static","js","users.js"))
// })
module.exports = router