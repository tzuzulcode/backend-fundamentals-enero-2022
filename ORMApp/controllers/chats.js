const db = require("../models/index")
class ChatController{
    async getChats(req,res){
        const chats = await db.Messages.findAll({
            include:db.Users,
            where:{
                idReceiver:11
            }
        })

        console.log(chats)

        return res.json(chats)
    }

    async createMessage(req,res){
        const message = await db.Messages.create({
            idSender:11,
            idReceiver:11,
            message:"Hola"
        })

        return res.json(message)
    }
}

module.exports = ChatController