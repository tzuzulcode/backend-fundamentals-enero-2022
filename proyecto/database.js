const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'tzuzul', // 'root'
    password:'12345',
    database:'BackEndFundamentalsEnero2022'
})

connection.query('SELECT * FROM users',function(error,result){
    //Error first callback
    if(error){
        console.log(error.sqlMessage)
    }else{
        console.log(result)
    }
})

// Encapsulando con promesas:
function query(){
    
    connection.query('SELECT * FROM users',function(error,result){
        //Error first callback
        if(error){
            console.log(error.sqlMessage)
        }else{
            console.log(result)
        }
    })

    mipromesa.then(res=>console.log(res))
    .catch(err=>console.log(err))
}