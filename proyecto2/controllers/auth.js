const User = require("../models/User")

class AuthController{
    getLoginView(req,res){
        return res.render("login",{formCSS:true})
    }

    getSignUpView(req,res){
        return res.render("signup",{formCSS:true})
    }

    async signUp(req,res){
        // req.body:
        // {
        //     username:"tzuzulcode",
        //     firstName:"Tzuzul",
        //     ...
        // }

        const newUser = new User(req.body)
        const validation = newUser.validate()
        console.log(validation)
        if(validation.sucess){
            await newUser.save()
            return res.redirect("/")
        }
        
        return res.render("signup",{validation,user:newUser})
    }
}

module.exports = AuthController