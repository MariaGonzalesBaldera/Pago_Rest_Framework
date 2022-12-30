const token = JSON.parse(localStorage.getItem("jwt.token"))||[]

const form = document.querySelector("form")
const emailI = document.querySelector("#email")
const passwordI = document.querySelector("#password")


form.onsubmit = async function(event){
    event.preventDefault()
    email = emailI.value
    password = passwordI.value
    user = {
        "email": email,
        "password": password
    }
    const response = await fetch(
        "http://127.0.0.1:8000/users/login/",
        {
            method: "POST",
            headers: {
                "Content-type":"application/json",
            },
            body: JSON.stringify(user),
        })

    const data = await response.json();
    if (data.message=="Logeado correctamente"){
        const newToken =[...token,data]
        localStorage.setItem("jwt.token",JSON.stringify(newToken))
        location.href ="/"
    }else{
        Swal.fire({
            icon:"error",
            title: 'Oops...',
            text: "¡Correo o clave no válida!"
        }) 
    }
}












