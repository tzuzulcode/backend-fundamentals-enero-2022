const express = require("express")
const UserController = require("../controllers/users")

const router = express.Router()

const userController = new UserController()

//const funcion = userController.getUsersView

// No funciona, si utilizamos this dentro de la funcion getUserView:
router.get("/",userController.getUsersView)

//Esto funciona:
// router.get("/",(req,res)=>{
//     userController.getUsersView(req,res)
// })
// Esto tambien funciona:
// router.get("/",userController.getUsersView.bind(userController))
//Igual funciona:
// router.get("/",(...args)=>userController.getUsersView(...args))


module.exports = router