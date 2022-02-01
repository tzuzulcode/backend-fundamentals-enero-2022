function verificarPromesa(cumple){
    return new Promise(function(cumplir,romper){
        if(cumple){
            cumplir("Cumplí mi promesa 😄")
        }else{
            romper("No cumplí mi promesa 🥺")
        }
    })
}

function generarPromesaAsync(cumple){
    console.log("Esperando respuesta...")
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(cumple){
                resolve("Cumplí mi promesa 😄")
            }else{
                reject("No cumplí mi promesa 🥺")
            }
        },5000)
    })
}

verificarPromesa(false)
.then(function(mensaje){
    console.log(mensaje)
    return verificarPromesa(true)
})
.then(function(mensaje){
    console.log(mensaje)
    return verificarPromesa(false)
})
.then((mensaje)=>{
    console.log(mensaje)
})
.catch(function(mensaje){
    console.log(mensaje)
})


generarPromesaAsync(false)
.then((mensaje)=>{
    console.log(mensaje)
})
.catch(function(mensaje){
    console.log(mensaje)
})
