const User = require("../models/User")

class UserController{

    // async readAll(){
    //     const users = await query("SELECT * FROM users")
    //     return users
    // }

    async getUsersView(req,res){
        let resData
        if(req.session.loggedIn){
            const resultado = await User.readFilteredUser(req.session.idUser)
            resData = {
                users:resultado.people,
                hasUsers:resultado.people.length > 0,
                friends:resultado.friends,
                hasFriends:resultado.friends.length>0,
                loggedIn:req.session.loggedIn
            }
        }else{
            let data = await User.readAll()
            resData = {
                users:data,
                hasUsers:data.length > 0,
                hasFriends:false,
                loggedIn:false
            }
        }
         
        if(req.session.loggedIn){
            const friendRequests   = await User.getFriendRequest(req.session.idUser)

            console.log(friendRequests)
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

    async acceptFriend(req,res){
        const idFriend = req.params.idFriend
        await User.acceptFriend(idFriend,req.session.idUser)
        res.redirect("/")
    }
}

module.exports = UserController