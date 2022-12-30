//Agregar un nuevo servicio
const formM = document.querySelector("#formAgregar")
const inputsM = document.querySelectorAll("input")

  //  recuperacion de datos para validacion
const nameA = document.querySelector('#nameA')
const descriptionA = document.querySelector('#descriptionA')
const logoA = document.querySelector('#logoA')
let msg = document.getElementById("msg");


formM.onsubmit = async function (event){
    event.preventDefault()
    formValidationNuevoServicio()
}

//Llenar datos desde la db
const selectId = document.querySelector("select")

const nameM = document.querySelector("#nameM");
const descriptionM = document.querySelector("#descriptionM");
const logoM = document.querySelector("#logoM");

selectId.addEventListener("change",(event) => {
    event.preventDefault()
    getData()
})

const getData = async () => {
    id = selectId.value
    const response = await fetch(`http://127.0.0.1:8000/services/${id}/`)
    const { name, description,logo } = await response.json()
    nameM.value = name;
    descriptionM.value = description;
    logoM.value = logo;
}
//Actualizar datos

const formModificar = document.querySelector("#formModificar")
let msg1 = document.getElementById("msg1");

formModificar.onsubmit= async function(event){
    event.preventDefault();
    formValidation();
};

let formValidation = () => {
    if (nameM.value === "") {
      msg1.classList.remove("d-none");
    }
    if(descriptionM.value === ""){
      msg1.classList.remove("d-none");
    }
    if(logoM.value === ""){
        msg1.classList.remove("d-none");
      }
    if (nameM.value !== "" && descriptionM.value !== ""  && logoM.value !== ""){
      msg1.classList.add("d-none");
      acceptData();
    }
  };

  async function AgregarServicio(){
    const body ={}
    inputsM.forEach((input)=>( body[input.name] = input.value))
    try {
        await fetch("http://127.0.0.1:8000/services/",{
            method :"POST",
            headers :{
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify(body),
        }).then((response)=>{
            if (response.ok){
                Swal.fire(
                    'Agregado!',
                    'El nuevo servicio se agrego exitosamente',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                        location.href ="index.html"    
    
                    }
                }) 
            }
            else{
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
  async function acceptData(){
    const data = {
        name: nameM.value,
        description: descriptionM.value,
        logo : logoM.value,
    }
    await fetch(`http://127.0.0.1:8000/services/${id}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Actualizado!',
                'Los datos se actualizaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    location.href ="index.html"    

                }
            }) 
        }
        else{
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })           
        }
    })
}


let formValidationNuevoServicio =()=>{
    if (nameA.value === "") {
        msg.classList.remove("d-none");
      }
      if(descriptionA.value === ""){
        msg.classList.remove("d-none");
      }
      if(logoA.value === ""){
          msg.classList.remove("d-none");
        }
      if (nameA.value !== "" && descriptionA.value !== ""  && logoA.value !== ""){
        msg.classList.add("d-none");
        AgregarServicio();
      }
}