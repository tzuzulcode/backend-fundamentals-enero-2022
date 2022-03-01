const User = require("../models/User")
const userModel = new User()

class UserController{

    // async readAll(){
    //     const users = await query("SELECT * FROM users")
    //     return users
    // }

    async getUsersView(req,res){
        const data = await userModel.readAll()
        return res.render("home",{
            username:"tzuzulcode",
            data,
            hasUsers:data.length > 0
        })
    }
}

module.exports = UserController