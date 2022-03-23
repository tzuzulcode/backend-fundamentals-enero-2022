const path = require("path")
const express = require("express")
const { port, secret } = require("./config")
const {engine} = require("express-handlebars")
const { DateTime,Interval } = require("luxon");
const session = require("express-session")

//Importando rutas
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth");
const addSessionToTemplate = require("./middleware/addSessionToTemplate");

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
app.use(session({
    secret:secret,
    resave:false,
    saveUninitialized:false
}))

app.use(addSessionToTemplate)

app.engine('hbs',engine({
    extname:"hbs",
    // layoutsDir:"templates",
    partialsDir:path.join(__dirname,"views","components"),
    helpers:{
        toBoolean:function(number){
            return number==1
        },
        formatDate:function(date){
            const newDate = DateTime.fromJSDate(date)
            return newDate.toFormat("yyyy-MM-dd")
        },
        formatHour:function(date){
            const newDate = DateTime.fromJSDate(date)

            const diff = newDate.diffNow(["minutes","hours","days"]).toObject()
            if(diff.days<0){
                return `Hace ${-1*diff.days} días`
            }else if(diff.hours<0){
                return `Hace ${-1*diff.hours} horas`
            }else if(diff.minutes<0){
                return `Hace ${Number.parseInt(-1*diff.minutes)} minutos`
            }
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