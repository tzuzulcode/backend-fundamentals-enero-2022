const express = require("express")
const ChatController = require("../controllers/chats")
const { verifySession, verifyAdmin } = require("../middleware/verifySession")


const router = express.Router()
const chatController = new ChatController()

router.get("/",chatController.getChats)
router.get("/create",verifySession,verifyAdmin,chatController.createMessage)


module.exports = router