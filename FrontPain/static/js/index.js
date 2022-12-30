const url = "http://127.0.0.1:8000/pagos/"

const urlPenalidad = 'http://127.0.0.1:8000/expired_payments/'

const usuario = document.querySelector("#usuario")
const salir = document.querySelector("#formEliminar")
const container = document.querySelector(".row1")
const container2 = document.querySelector(".row2")

async function getUser(){
    list = JSON.parse(localStorage.getItem("jwt.token"))
    list.forEach(ele => {
        usuario.textContent= ele.email 
    })
}

async function getServices() {
    getUser()    
    const response = await fetch(url)
    const data = await response.json()
    data.forEach((serv) => {
        container.innerHTML += renderServicio(serv)
    });


}
getServices()

async function getPenalidad() {
    const response = await fetch(urlPenalidad)
    const data = await response.json()
    data.forEach((pen) => {
        container2.innerHTML += renderPenalidad(pen)
    });
}
getPenalidad()


function renderServicio(servicio) {
    return `
        <tr>
            <th scope="row"><img src="${servicio.logo}" width="32" height="32" class="rounded-circle"></th>
            <td>${servicio.name}</td>
            <td>${servicio.fecha_pago}</td>
            <td>${servicio.monto}</td>
        </tr>`
}

function renderPenalidad(serv) {
    return `
        <tr>
            <th scope="row"><img src="${serv.logo}" width="32" height="32" class="rounded-circle"></th>
            <td>${serv.name}</td>
            <td>${serv.expirationDate}</td>
            <td>${serv.amount}</td>
            <td>${serv.penalty_fee_amount}</td>
        </tr>`
}


//salir
salir.onsubmit= async function(event){
    event.preventDefault();
    localStorage.removeItem("jwt.token")
    location.href ="login.html"    
}