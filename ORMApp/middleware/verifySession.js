function verifySession(req,res,next){
    if(!req.session.loggedIn){
        return res.redirect("/notAllowed")
    }

    next()
}
function verifyNoSession(req,res,next){
    if(req.session.loggedIn){
        return res.redirect("/")
    }

    next()
}

function verifyAdmin(req,res,next){
    if(req.session.role!=="admin"){
        return res.redirect("/notAllowed")
    }

    next()
}


module.exports = {verifySession,verifyAdmin,verifyNoSession}