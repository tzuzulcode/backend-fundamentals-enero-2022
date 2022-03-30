const db = require("../models/index")

class AuthController{
    getLoginView(req,res){
        const status = req.flash("status")
        return res.render("login",{status:{
            show:status.length>0,
            messages:status
        }})
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
        const userData = await db.User.findOne({
            where:{
                email:credenciales.email
            }
        })

        if(userData){
            const user = userData.dataValues
            if(user.password===credenciales.password){
                req.session.loggedIn = true
                req.session.username = user.username
                req.session.idUser = user.id
                return res.redirect("/")
            }
            
        }

        return res.render("login")
        
    }

    async signUp(req,res){

        try{
            //try intenta ejecutar codigo que posiblemente lance una excepcion
            const newUser = await db.User.create(req.body)
            req.flash("status",["Usuario registrado exitosamente","Por favor inicia sesión"])
            return res.redirect("/auth/login")
        }catch(error){
            //Entra aquí si se lanza una excepcion
            return res.render("signup")
        }
    }
}


module.exports = AuthController