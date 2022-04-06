class ChatController{
    getChats(req,res){
        console.log(req.session)
        return res.json(["Chat1","Chat2","Chat3"])
    }
}

module.exports = ChatController