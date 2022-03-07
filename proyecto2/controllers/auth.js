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
        if(validation.success){
            const userSaved = await newUser.save()
            console.log(userSaved)
            if(userSaved.success){
                return res.redirect("/")
            }else{
                validation.errors = [userSaved.error]
                validation.success = false
                //No se puede porque es const: validation = {success:true,errors:["El correo electrónico ya esta en uso"]}
            }
        }
        
        return res.render("signup",{validation,user:newUser})
    }
}

module.exports = AuthController