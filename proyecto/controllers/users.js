const database = require("../database")
class UserController{
    async create(user){
        const results = await database.insert('users',user)
        console.log(results)
        return results
    }

    async readAll(){
        const users = await database.query("SELECT * FROM users")

        return users
    }

    async delete(id){
        const user = await database.del("users",id)
        return user
    }
}

module.exports = UserController