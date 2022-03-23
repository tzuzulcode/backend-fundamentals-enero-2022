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

    //Hacer un filtro de los usuarios para retirar a nosotros
    //
    static async readFilteredUser(idUser){
        //
        //SELECT * FROM users WHERE id != 77 AND id NOT IN (SELECT users.id FROM users JOIN friendship ON users.id=friendship.idFriend2);

        const friends = await query("SELECT * FROM users JOIN friendship ON users.id=friendship.idFriend2 WHERE friendship.idFriend=?",[idUser])

        const people = await query("SELECT * FROM users WHERE id != ? AND id NOT IN (SELECT users.id FROM users JOIN friendship ON users.id=friendship.idFriend2 WHERE friendship.idFriend=?)",[idUser,idUser])

        console.log(friends)
        console.log(people)

        return {friends,people}
    }
    static async addFriend(idFriend1,idFriend2){
        return await query("INSERT INTO friendship(idFriend,idFriend2) VALUES(?,?)",[idFriend1,idFriend2])
    }

    static async acceptFriend(sender,me){
        await query("UPDATE friendship SET status=true WHERE idFriend=? AND idFriend2=?",[sender,me])
        return await query("INSERT INTO friendship(idFriend,idFriend2,status) VALUES(?,?,true)",[me,sender])
    }

    static async getFriendRequest(idUser){
        return await query("SELECT users.id AS id,name,profile_pic,username FROM friendship JOIN users ON users.id=friendship.idFriend WHERE idFriend2 = ? AND status=0;",[idUser])
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
        this.idUser = newUser.id

        return newUser
    }

    async update(newUser){
        const id = await query("UPDATE users SET ? WHERE idUser ?" ,[newUser,this.idUser])
    }

    async delete(){
        await query("DELETE FROM users WHERE idUser = ?",[this.idUser])
    }

    static async getByEmail(email){
        return await query("SELECT * FROM users WHERE email=?",[email])
    }


    validate(){
        let result = {success:true,errors:[]}
        if(!(this.name && this.username && this.email && this.password && this.passwordRepeated)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        if(this.password!==this.passwordRepeated){
            result.success = false
            result.errors.push("Las contraseñas no coinciden")
        }
        return result
    }


}

module.exports = User