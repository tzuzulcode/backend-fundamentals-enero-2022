const express = require("express")
const path = require("path")
const UserController = require("../controllers/users")

function views(document){
    console.log(__dirname)
    return path.join(__dirname,"../","views",document)
}
const router = express.Router()
const userController = new UserController()

// Asignando middleware al router
//router.use('/users')

router.get('/registro',function(request,response){
    return response.sendFile(views("registro.html"))
})

router.post('/registro',async function(request,response){
    console.log(request.body) // {name: 'Tzuzul Code',email: 'mail@tzuzulcode.com',birthday: '2022-02-07'}
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
    return res.json({users:["Tzuzul","Manuel","Gustavo"]})
})
router.post("/users",(req,res)=>{
    console.log(req.body)
    return res.json({users:["Tzuzul","Manuel","Gustavo"]})
})

module.exports = router