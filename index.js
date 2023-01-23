const botonEnter = document.querySelector('#enter')
const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const LineThrough = 'line-through'
let id
let LISTA




// fecha

const FECHA = new Date()
fecha.innerHTML= FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'short',day:'numeric'})




//agregar juego funcion

function agregarJuego (juego,id,realizado,eliminado) {
    
    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?LineThrough :''

    const elemento =   `
                     <li id="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${juego}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>

                    </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)
}

// funcion de juego Realizado

function juegoRealizado(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(LineThrough)
    LISTA[element.id].realizado = LISTA[element.id].realizado ?false :true
}


//funcion de juego Eliminado

function juegoEliminado(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LISTA[element.id].eliminado = true
}


//---//


botonEnter.addEventListener('click',()=> {
    const juego = input.value
    if(juego) {
        agregarJuego(juego,id,false,false)
        LISTA.push({
            nombre: juego,
            id: id, 
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LISTA))
    input.value=''
    id++
}
)

document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const juego = input.value
        if(juego){
            agregarJuego(juego,id,false,false)
            LISTA.push({
                nombre: juego,
                id: id, 
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LISTA))
        input.value=''
        id++
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
     if (elementData=== 'realizado') {
            juegoRealizado(element)
     }
     else if (elementData==='eliminado') {
            juegoEliminado(element)
     }
     localStorage.setItem('TODO', JSON.stringify(LISTA))
}
)


// local storage get item

let data = localStorage.getItem('TODO')
if(data){
    LISTA=JSON.parse(data)
    id=LISTA.length
    cargarLista(LISTA)
} else{
    LISTA = []
    id=0
}

function cargarLista(DATA) {
    DATA.forEach(function(i){
        agregarJuego(i.nombre,i.id,i.realizado,i.eliminado)
    })
}
    