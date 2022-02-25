const express = require("express")
const { port } = require("./config")
const {query} = require("./config/database")
const {engine} = require("express-handlebars")
const { DateTime } = require("luxon");

// engine.registerHelper("formatDate",(date)=>{
//     return DateTime.fromISO(date)
// })

const app = express()

// const hbs = handlebars.create({
//     defaultLayout:null,
//     extname:"hbs",
//     // layoutsDir:"templates"
//     helpers:{
//         formatDate:function(date){
//             const newDate = new DateTime(date)
//             return newDate.toFormat("yyyy-MM-dd")
//         }
//     }
// })


app.engine('hbs',engine({
    defaultLayout:null,
    extname:"hbs",
    // layoutsDir:"templates"
    helpers:{
        formatDate:function(date){
            const newDate = new DateTime(date)
            return newDate.toFormat("yyyy-MM-dd")
        }
    }
}))
    
app.set("view engine",'hbs')
app.set("views","views")

app.get("/",async (req,res)=>{
    const del = await query("DELETE FROM users")
    const users = await query("SELECT * FROM users")
    return res.render("home",{
        username:"tzuzulcode",
        users,
        hasUsers:users.length > 0
    })
})

app.listen(port,function(){
    console.log("Funcionando... http://localhost:"+port)
})