
// Lista de libros 
let libros = JSON.parse(localStorage.getItem('libros')) || []

// Generos de libros
let generos = ['Ficcion', 'Drama', 'Poesia', 'Comedia', 'Historia','Terror','Misterio']

const seleccion_generos = () =>{
    const select = document.getElementById('genero')
    select.innerHTML = ''
    
    generos.forEach( genero =>{
        const option = document.createElement('option')
        option.value = genero
        option.textContent = genero
        select.appendChild(option)
    })
}


// Agregar libro
const agregar_libro = () =>{
    // Guardar valores del formulario 
    const titulo = document.getElementById('titulo').value.trim()
    const autor = document.getElementById('autor').value.trim()
    const anio = document.getElementById('anio').value.trim()
    const genero = document.getElementById('genero').value

    // Comprobar que no esten vacios
    if (titulo !== '' && autor !== '' && anio !== ''){
        libros.push({ titulo, autor, anio, genero })
        // Guardar lista de la libros en local storage
        localStorage.setItem('libros', JSON.stringify(libros))
        console.log(libros)
    } 

    // Mostrar libros
    renderizar_libros()

    // Vaciar los campos del formulario
    document.getElementById('titulo').value = ''
    document.getElementById('autor').value = ''
    document.getElementById('anio').value = ''
}

// Filtrar libros por titulo
const buscar_titulo = () =>{
    // Guardar titulo buscado
    const filtro_titulo = document.getElementById('busqueda_titulo').value.toLowerCase()

    // Lista con libros filtrados
    const titulos_filtrados = libros.filter(libro => libro.titulo.toLowerCase().includes(filtro_titulo))

    // Mostrar libros
    renderizar_libros(titulos_filtrados)
}

// Filtrar libros por genero
const buscar_genero = () =>{
    // Guardar genero seleccionado
    const filtro_genero = document.getElementById('busqueda_genero').value.toLowerCase()

    // Lista con libros filtrados
    const generos_filtrados = libros.filter(libro => libro.genero.toLowerCase().includes(filtro_genero))

    // Mostrar libros
    renderizar_libros(generos_filtrados)
}

const ordenar_libros = () =>{

}

// Renderizar libros
const renderizar_libros = (lista = libros) =>{ // Recibe una lista

    // Guardar tabla
    const tabla = document.getElementById('tabla_libros').querySelector('tbody')

    // Vaciar tabla
    tabla.innerText = ''
    
    // Mostrar cada libro de la lista
    lista.forEach(libro => {
        // Guardar numero de posicion
        const index = libros.indexOf(libro)

        // Crear fila
        const fila = document.createElement('tr')

        // Mostrar fila con los datos del libro y botones de accion
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.anio}</td>
            <td>${libro.genero}</td>
            <td>
                <button onclick="">Editar</button>
                <button onclick="">Eliminar</button>
            </td>
        `
        // Agregar fila a la tabla
        tabla.appendChild(fila)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    renderizar_libros()
    seleccion_generos()
})