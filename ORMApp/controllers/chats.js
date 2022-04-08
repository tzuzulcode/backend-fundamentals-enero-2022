const db = require("../models/index")
class ChatController{
    
    async getChats(req,res){
        // console.log(db.Messages.associations)
        // console.log(db.User.associations)
        // const chats = await db.Messages.findAll({
        //     include:db.User,
        //     where:{
        //         idReceiver:11
        //     }
        // })

        // console.log(chats)

        const users = await db.User.findAll({
            include:[
                db.User.associations.sender,
                db.User.associations.receiver
            ]
        })

        console.log(users[0].sender[0].dataValues.Messages);
        console.log(users[0].receiver[0].dataValues.Messages);

        

        return res.json([])
    }

    async createMessage(req,res){
        const message = await db.Messages.create({
            idSender:35,
            idReceiver:11,
            message:"Hola"
        })

        return res.json(message)
    }
}

module.exports = ChatController