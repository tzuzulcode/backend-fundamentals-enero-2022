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

async function insert(tableName,data){
    try{
        await query(`INSERT INTO ${tableName}(??) VALUES(?)`,[Object.keys(data),Object.values(data)])
        return data
    }catch(error){
        return error
    }
}

//No podemos usar delete: palabra reservada
async function del(tableName,data){
    try{
        await query(`DELETE FROM ${tableName} WHERE id=?`,[data])
        return data
    }catch(error){
        return error
    }
}

// Exportamos un objeto
module.exports = {query,insert,del}

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