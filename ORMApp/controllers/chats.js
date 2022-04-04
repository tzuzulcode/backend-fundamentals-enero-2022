class ChatController{
    getChats(req,res){
        if(!req.session.loggedIn && req.session.role!=="admin"){
            return res.redirect("/")
        }
        console.log(req.session)
        return res.json(["Chat1","Chat2","Chat3"])
    }
}

module.exports = ChatController