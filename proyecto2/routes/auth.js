const express = require("express")

const router = express.Router()

router.get("/login",(req,res)=>{
    return res.render("login",{formCSS:true})
})

module.exports = router