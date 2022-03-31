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
        return res.render("signup",{isError:false})
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
        const validation = this.validate(req.body)
        if(!validation.isError){
            try{
                //try intenta ejecutar codigo que posiblemente lance una excepcion
                const newUser = await db.User.create(req.body)
                req.flash("status",["Usuario registrado exitosamente","Por favor inicia sesión"])
                return res.redirect("/auth/login")
            }catch(error){
                // const errors = error.errors.map((e)=>{
                //     if(e.type==="unique violation"){
                //         return `El ${e.path} '${e.value}' ya esta en uso` 
                //     }

                //     return e.message
                // })
                const errors = error.errors.map( e => e.type==="unique violation"?
                    `El ${e.path} '${e.value}' ya esta en uso`:
                    e.message
                )
                //Entra aquí si se lanza una excepcion
                return res.render("signup",{
                    isError:true,
                    errors:errors
                })
            }
        }else{
            return res.render("signup",validation)
        }
    }

    validate(userData){
        let result = {isError:false,errors:[]}
        if(!(userData.name && userData.username && userData.email && userData.password && userData.passwordRepeated)){
            result.isError = true
            result.errors.push("Rellena todos los campos")
        }
        if(userData.password!==userData.passwordRepeated){
            result.isError = true
            result.errors.push("Las contraseñas no coinciden")
        }
        return result
    }
}


module.exports = AuthController