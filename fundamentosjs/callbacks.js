// callback: una funcion

function imprimirDatos(datos,callback){
    console.log(datos)
    callback(datos.toUpperCase())
}

function saludar(nombre){
    console.log("Hola ð",nombre)
}
function despedir(nombre){
    console.log("Adios ð",nombre)
}

imprimirDatos("Tzuzul",saludar)
imprimirDatos("Tzuzul",despedir)
imprimirDatos("Bruno",function(datos){
    console.log("Mucho gusto ð",datos)
})
imprimirDatos("Bruno",despedir)

// Arrow functions -> funciones flecha
imprimirDatos("Gerardo",(datos)=>{
    console.log("Buenos dÃ­as ð",datos)
})
//saludar("Tzuzul")