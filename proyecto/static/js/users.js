let usersData = []
var users = document.getElementById("users")

function eliminar(id){
    fetch("/api/users/"+id,{
        method:"DELETE"
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        usersData = data
        renderUsers()
    })
}

// function filterUser(id){
//     let newUsers = []

//     for(let i=0;i<usersData.length;i++){
//         if(usersData[i].id!==id){
//             newUsers.push(usersData[i])
//         }
//     }
//     usersData = newUsers
// }

function renderUsers(){
    
    users.innerHTML = ""
    for(var user of usersData){
        users.innerHTML = users.innerHTML + `<div class="user">
                <p class="name">${user.name}</p>
                <p>${user.email}</p>
                <img src="${user.profile_pic}">
                <button onClick="eliminar(${user.id})">Eliminar</button>
                <a href="/editUser/${user.id}">Editar</a>
            </div>`
    }
}
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

    usersData = data
    renderUsers()
})