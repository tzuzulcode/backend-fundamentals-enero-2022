const User = require("../models/User")

class UserController{

    // async readAll(){
    //     const users = await query("SELECT * FROM users")
    //     return users
    // }

    async getUsersView(req,res){
        const data = await User.readAll()
        console.log(data)
        return res.render("home",{
            username:"tzuzulcode",
            users:data,
            hasUsers:data.length > 0
        })
    }
}

module.exports = UserController