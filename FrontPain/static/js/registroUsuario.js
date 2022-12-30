const inputs = document.querySelectorAll("input")

const emailI = document.querySelector("#email");
const usernameI = document.querySelector("#username");
const passwordI = document.querySelector("#password");
const password2I = document.querySelector("#password2");
const form = document.querySelector("form");
let msg1 = document.getElementById("msg");
let msgClave = document.getElementById("msgClave");


form.onsubmit = async function(event){
    event.preventDefault();
    validacionDatos()    
}

let validacionDatos = () => {
     
    if (emailI.value === "") {
      msg1.classList.remove("d-none");
    }
    if(usernameI.value === ""){
      msg1.classList.remove("d-none");
    }
    if(passwordI.value === ""){
        msg1.classList.remove("d-none");
      }
      if(password2I.value === ""){
        msg1.classList.remove("d-none");
      }  
        
    if (emailI.value !== "" && usernameI.value !== ""  && passwordI.value !== "" && password2I.value !== ""){
      msg1.classList.add("d-none");
      if(passwordI.value != password2I.value){
        msgClave.classList.remove("d-none");
        
    }
    registrarUsuario()
    }
    
  };

  async function registrarUsuario(){
    const body ={}
    inputs.forEach((input)=>( body[input.name] = input.value))
    try {
        await fetch("http://127.0.0.1:8000/users/signup/",{
            method :"POST",
            headers :{
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify(body),
        }).then((response)=>{
            if (response.ok){
                Swal.fire(
                    'Agregado!',
                    'Usuario registrado exitosamente',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                        location.href ="index.html" 
                    }
                }) 
            }else{
                Swal.fire({
                    icon:"error",
                    title: 'Oops...',
                    text: "¡Ocurrió un error!"
                })           
            }
        })
    } catch (error) {
        console.log(error)
    }
  } 

