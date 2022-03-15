const User = require("../models/User")

class UserController{

    // async readAll(){
    //     const users = await query("SELECT * FROM users")
    //     return users
    // }

    async getUsersView(req,res){
        const data = await User.readAll()
        let resData = {
            users:data,
            hasUsers:data.length > 0,
            loggedIn:req.session.loggedIn
        }
        if(req.session.loggedIn){
            const friendRequests   = await User.getFriendRequest(req.session.idUser)
            resData.friendRequests = friendRequests
            resData.hasFriendRequests = friendRequests.length>0
        }
        console.log(req.session)
        // if(req.session.loggedIn){
        //     //res.locals.username = req.session.username
        //     //res.locals.loggedIn = true
        //     return res.render("home",{
        //         users:data,
        //         hasUsers:data.length > 0,
        //         // username:req.session.username,
        //         // loggedIn:true
        //     })
        // }
        return res.render("home",resData)
    }

    async addFriend(req,res){
        const idFriend = req.params.idFriend

        await User.addFriend(req.session.idUser,idFriend)

        res.redirect("/")
    }
}

module.exports = UserController