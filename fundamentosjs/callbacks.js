// callback: una funcion

function imprimirDatos(datos,callback){
    console.log(datos)
    callback(datos.toUpperCase())
}

function saludar(nombre){
    console.log("Hola 👋",nombre)
}
function despedir(nombre){
    console.log("Adios 👋",nombre)
}

imprimirDatos("Tzuzul",saludar)
imprimirDatos("Tzuzul",despedir)
imprimirDatos("Bruno",function(datos){
    console.log("Mucho gusto 😊",datos)
})
imprimirDatos("Bruno",despedir)

// Arrow functions -> funciones flecha
imprimirDatos("Gerardo",(datos)=>{
    console.log("Buenos días 😎",datos)
})
//saludar("Tzuzul")