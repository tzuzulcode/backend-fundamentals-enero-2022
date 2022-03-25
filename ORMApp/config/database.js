const {Sequelize} = require("sequelize")
const { dbName, dbUser, dbPassword, dbPort, dbHost } = require(".")

const sequelize = new Sequelize(dbName,dbUser,dbPassword,{
    dialect:"mysql",
    port:dbPort,
    host:dbHost
}) // Creando la conexion con el orm

async function connection(){
    try{
        await sequelize.authenticate()
        console.log("Conectado exitosamente!")
    }catch(error){
        console.log("No se pudo conectar")
        console.log(error)
    }
}

module.exports = {connection,sequelize}