const {query,insert} = require("../config/database")

class User{
    constructor(firstName,lastName,username,email,birthday,profilePic,idUser){
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.email = email
        this.birthday = birthday
        this.profilePic = profilePic
        this.idUser=idUser
    }

    //TODO: Metodo estatico
    async readAll(){
        return await query("SELECT * FROM users")
    }

    async save(){
        const newUser = await insert("users",this)
        this.idUser = newUser
    }

    async update(newUser){
        const id = await query("UPDATE users SET ? WHERE idUser ?" ,[newUser,this.idUser])
    }

    async delete(){
        await query("DELETE FROM users WHERE idUser = ?",[this.idUser])
    }


}

module.exports = User