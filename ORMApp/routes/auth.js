const express = require("express")
const AuthController = require("../controllers/auth")


const router = express.Router()
const authController = new AuthController()

router.get("/login",authController.getLoginView)
router.post("/login",authController.logIn)
router.get("/signup",authController.getSignUpView)
router.post("/signup",authController.signUp)
router.get("/logout",authController.logOut)

module.exports = router