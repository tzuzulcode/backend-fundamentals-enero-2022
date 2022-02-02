const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'tzuzul', // 'root'
    password:'12345',
    database:'BackEndFundamentalsEnero2022'
})

// connection.query('SELECT * FROM users',function(error,result){
//     //Error first callback
//     if(error){
//         console.log(error.sqlMessage)
//     }else{
//         console.log(result)
//     }
// })
// connection.query('SELECT * FROM compras',function(error,result){
//     //Error first callback
//     if(error){
//         console.log(error.sqlMessage)
//     }else{
//         console.log(result)
//     }
// })

// Encapsulando con promesas:
function query(sql,data){
    return new Promise((resolve,reject)=>{
        connection.query(sql,data,function(error,result){
            //Error first callback
            if(error){
                reject(error.sqlMessage)
            }else{
                resolve(result)
            }
        })
    })
}

module.exports = query

// Una forma de gestionar instrucciones async:
// query('SELECT * FROM users')
// .then((results)=>{
//     console.log(results)
// })
// .catch((error)=>{
//     console.log(error)
// })
// query('SELECT * FROM compras')
// .then((results)=>{
//     console.log(results)
// })
// .catch((error)=>{
//     console.log(error)
// })