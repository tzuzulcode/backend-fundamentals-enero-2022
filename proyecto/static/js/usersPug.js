function eliminar(id){
    fetch("/api/users/"+id,{
        method:"DELETE"
    })
    .then((res)=>{
        location.href = "/usersPug"
    })
}