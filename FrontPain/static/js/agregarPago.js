const urlServicios = "http://127.0.0.1:8000/services/"

const container = document.querySelector(".form-select")
//Recuperar servicios en select

async function getServices() {
    const response = await fetch(urlServicios)
    const data = await response.json()
    data.forEach(serv => {
        container.innerHTML += renderServicio(serv)
    });
}
getServices()

function renderServicio(servicio) {
    return `
        <option value="${servicio.id}">${servicio.name}</option>    `
}

//Agregar un nuevo pago
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input")
const select = document.querySelector("select")

form.onsubmit = async function (event){
    event.preventDefault()
    const body={
        services_id : select.value,
    }

    inputs.forEach((input)=>(body[input.name] = input.value))
    try {
        await fetch("http://127.0.0.1:8000/pagos/",{
            method :"POST",
            headers :{
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify(body),
        }).then((response)=>{
            if (response.ok){
                Swal.fire(
                    'Agregado!',
                    'El pago se agrego correctamente',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                        location.href ="/"    
    
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

