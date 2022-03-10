const User = require("../models/User")

class UserController{

    // async readAll(){
    //     const users = await query("SELECT * FROM users")
    //     return users
    // }

    async getUsersView(req,res){
        const data = await User.readAll()
        console.log(req.session)
        // if(req.session.loggedIn){
        //     //res.locals.username = req.session.username
        //     //res.locals.loggedIn = true
        //     return res.render("home",{
        //         users:data,
        //         hasUsers:data.length > 0,
        //         // username:req.session.username,
        //         // loggedIn:true
        //     })
        // }
        return res.render("home",{
            users:data,
            hasUsers:data.length > 0
        })
    }
}

module.exports = UserController