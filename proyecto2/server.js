const path = require("path")
const express = require("express")
const { port } = require("./config")
const {engine} = require("express-handlebars")
const { DateTime } = require("luxon");

//Importando rutas
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")

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

app.use(express.static(path.join(__dirname,"static")))

//Middleware
app.use(express.urlencoded({extended:true})) // Transforma de x-www-form-urlencoded a Object de JS

app.engine('hbs',engine({
    extname:"hbs",
    // layoutsDir:"templates",
    partialsDir:path.join(__dirname,"views","components"),
    helpers:{
        formatDate:function(date){
            const newDate = new DateTime(date)
            return newDate.toFormat("yyyy-MM-dd")
        }
    }
}))
    
app.set("view engine",'hbs')
app.set("views","views")

app.use(userRouter)
app.use(authRouter)

app.listen(port,function(){
    console.log("Funcionando... http://localhost:"+port)
})