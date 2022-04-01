const db = require("../models/index")

class UserController{
    static async findUser(email){
        const userData = await db.User.findOne({
            where:{
                email:email
            }
        })

        return userData
    }
}

module.exports = UserController