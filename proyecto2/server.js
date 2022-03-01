const express = require("express")
const { port } = require("./config")
const {engine} = require("express-handlebars")
const { DateTime } = require("luxon");

//Importando rutas
const userRouter = require("./routes/users")

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

app.use(userRouter)

app.listen(port,function(){
    console.log("Funcionando... http://localhost:"+port)
})