const {query,insert} = require("../config/database")

class User{
    idUser
    constructor(user){
        this.name = user.name
        this.username = user.username
        this.email = user.email
        this.birthday = user.birthday
        this.profilePic = user.profilePic
        this.password = user.password
        this.passwordRepeated = user.passwordRepeated
    }

    //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM users")
    }

    async save(){
        const newUser = await insert("users",{
            name:this.name,
            email:this.email,
            username:this.username,
            birthday:this.birthday,
            profile_pic:this.profilePic,
            password:this.password
        })
        this.idUser = newUser
    }

    async update(newUser){
        const id = await query("UPDATE users SET ? WHERE idUser ?" ,[newUser,this.idUser])
    }

    async delete(){
        await query("DELETE FROM users WHERE idUser = ?",[this.idUser])
    }


    validate(){
        let result = {sucess:true,errors:[]}
        if(!(this.name && this.username && this.email && this.password && this.passwordRepeated)){
            result.sucess = false
            result.errors.push("Rellena todos los campos")
        }
        if(this.password!==this.passwordRepeated){
            result.sucess = false
            result.errors.push("Las contraseñas no coinciden")
        }
        return result
    }


}

module.exports = User