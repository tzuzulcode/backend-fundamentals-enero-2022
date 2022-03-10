const User = require("../models/User")

class AuthController{
    getLoginView(req,res){
        return res.render("login",{formCSS:true})
    }

    getSignUpView(req,res){
        return res.render("signup",{formCSS:true})
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }

    async logIn(req,res){
        const credenciales = req.body
        const userData = await User.getByEmail(credenciales.email)
        if(userData.length === 0){
            return res.render("login",{validation:{
                errors:["Usuario no registrado"]
            }})
        }
        if(userData[0].password!==credenciales.password){
            return res.render("login",{validation:{
                errors:["Credenciales icorrectas"]
            }})
        }
        //return res.setHeader("Set-Cookie","loggedIn=true").redirect("/")
        req.session.loggedIn = true
        req.session.username = userData[0].username
        req.session.idUser = userData[0].id
        return res.redirect("/")
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