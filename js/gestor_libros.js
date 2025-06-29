
// Variables para manejar estados
let editando = false;
let indice_edicion = null;
let orden_ascendente = false;

// Lista de libros 
let libros = JSON.parse(localStorage.getItem('libros')) || []

// Generos de libros
let generos = ['Ficcion', 'Drama', 'Poesia', 'Comedia', 'Historia', 'Terror', 'Misterio']

// Agregar generos a una etiqueta select
const seleccion_generos = (id) =>{
    const select = document.getElementById(id)
    select.innerHTML = ''

    // Opción "Todos"
    const todos = document.createElement('option')
    todos.value = 'todos'
    todos.textContent = '-- Todos los géneros --'
    select.appendChild(todos)
    
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
        // Comprobar si se esta editando o agregando un libro nuevo
        if(indice_edicion !== null){
            // Guardar los nuevos valores del libro
            libros[indice_edicion] = {titulo, autor, anio, genero}
            // Vaciar indice de edicion
            indice_edicion = null
            // Cambiar texto del boton
            document.getElementById('button_form').textContent = 'Guardar cambios'
        }
        else{
        // Agregar libro a la lista
        libros.push({ titulo, autor, anio, genero })
    }
    // Guardar lista de la libros en local storage
    localStorage.setItem('libros', JSON.stringify(libros))} 
    // Mostrar libros
    renderizar_libros()

    // Vaciar los campos del formulario
    document.getElementById('titulo').value = ''
    document.getElementById('autor').value = ''
    document.getElementById('anio').value = ''
}


// Eliminar libro de la lista
const eliminar_libro = (index) =>{
    // Eliminar por medio del index
    libros.splice(index)

    // Actualizar local storage y renderizar libros
    localStorage.setItem('libros', JSON.stringify(libros))
    renderizar_libros()
}

const editar_libro = (index) =>{
    // Identificar libro usando el indice
    const libro = libros[index]
    document.getElementById('titulo').value = libro.titulo
    document.getElementById('autor').value = libro.autor
    document.getElementById('anio').value = libro.anio
    document.getElementById('genero').value = libro.genero

    // Guardar indice y cambiar valor de variable 
    indice_edicion = index
    editando = true
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
    const genero_seleccionado = document.getElementById('busqueda_genero').value

    // Mostrar todos los libros en caso de seleccionar todos los generos
    if (genero_seleccionado === 'todos' || genero_seleccionado === '') {
        renderizar_libros()
        return
    }

    // Crear lista de libros filtrados
    const generos_filtrados = libros.filter(libro => libro.genero.toLowerCase().includes(genero_seleccionado.toLowerCase())
    )
    // Mostrar libros filtrados
    renderizar_libros(generos_filtrados)
}

const ordenar_libros = () =>{
    
    // Crear una copia de la lista libros y ordenarla por año
    const libros_ordenados =  [...libros].sort((a,b) => {
        return orden_ascendente ? a.anio - b.anio : b.anio - a.anio
    })

    // Cambiar valor de la variable
    orden_ascendente = !orden_ascendente
    // Mostrar libros ordenados
    renderizar_libros(libros_ordenados)
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
                <button onclick="editar_libro(${index})">Editar</button>
                <button onclick="eliminar_libro(${index})">Eliminar</button>
            </td>
        `
        // Agregar fila a la tabla
        tabla.appendChild(fila)
    })
}


const mostrar_resumen = () =>{
    
    const resumen = document.getElementById('resumen_libros')
    
    if (libros.lenght === 0){
        resumen.innerText = 'No se muestran datos cargados'
        return;
    }   

    // Total de libros
    const total_libros = libros.length

    // Total de años
    const suma_anios = libros.reduce((contador, libro) => contador + parseInt(libro.anio), 0)
    
    // Promedio de años
    const promedio_anio = Math.round(suma_anios/total_libros)

    // Libros posteriores al 2010
    const libros_post_2010 = libros.filter(libro => libro.anio > 2010).length
    
    // Libro mas reciente
    const mas_reciente = libros.reduce((nuevo, libro) => (libro.anio > nuevo,anio ? libro: nuevo), libros[0])
    
    // Libro mas antiguo
    const mas_antiguo = libros.reduce((antiguo, libro) => (libro.anio < antiguo.anio ? libro : antiguo), libros[0])

    resumen.innerHTML = `
        <p> Total de libros: ${total_libros}</p>
        <p> Promedio de años: ${promedio_anio}</p>
        <p> Libros posteriores al año 2010: ${libros_post_2010}</p>
        <p> Libro mas reciente: ${mas_reciente.titulo} ${mas_reciente.anio}</p>
        <p> Libro mas antiguo: ${mas_antiguo.titulo} ${mas_antiguo.anio}</p>
    `
}



document.addEventListener('DOMContentLoaded', () => {
    renderizar_libros()
    seleccion_generos('genero')
    seleccion_generos('busqueda_genero')
    mostrar_resumen()
})