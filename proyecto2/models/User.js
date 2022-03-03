const {query,insert} = require("../config/database")

class User{
    #idUser
    constructor(user){
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.username = user.username
        this.email = user.email
        this.birthday = user.birthday
        this.profilePic = user.profilePic
        this.password = user.password
    }

    //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM users")
    }

    async save(){
        const newUser = await insert("users",this)
        this.#idUser = newUser
    }

    async update(newUser){
        const id = await query("UPDATE users SET ? WHERE idUser ?" ,[newUser,this.idUser])
    }

    async delete(){
        await query("DELETE FROM users WHERE idUser = ?",[this.idUser])
    }


}

module.exports = User