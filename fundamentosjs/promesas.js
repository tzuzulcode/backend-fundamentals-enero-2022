const miPromesa = new Promise(function(cumplir,romper){
    const valor = Math.floor(Math.random()*2)
    console.log(valor)
    if(valor===1){
        cumplir("Cumplí mi promesa 😄")
    }else{
        romper("No cumplí mi promesa 🥺")
    }
})

miPromesa
.then(function(mensaje){
    console.log(mensaje)
})
.catch(function(mensaje){
    console.log(mensaje)
})
