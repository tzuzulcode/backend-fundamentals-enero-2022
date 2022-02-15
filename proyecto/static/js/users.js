console.log("Hola mundo")
//Armando peticion
// Utilizando fetch
// fetch: Ir y traer algo
//fetch("http://localhost:4000/api/users") //Esto es valido
fetch("/api/users")
.then(function(respuesta){
    //console.log(respuesta)
    return respuesta.json()
})
.then(function(data){
    //console.log(data) // Data es arreglo
    var users = document.getElementById("users")
    // users.innerHTML = `
    //     <p>Hola</p>
    //     <h3>mensaje...</h3>
    // `
    for(var user of data){
        users.innerHTML = users.innerHTML + `<div class="user">
                <p class="name">${user.name}</p>
                <p>${user.email}</p>
                <img src="${user.profile_pic}">

            </div>`
    }

    fetch("/api/users/5",{
        method:"DELETE"
    })
    
})