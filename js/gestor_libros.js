let libros = JSON.parse(localStorage.getItem('libros')) || []



const agregar_libro = () =>{
    const titulo = document.getElementById('titulo').value.trim()
    const autor = document.getElementById('autor').value.trim()
    const anio = document.getElementById('anio').value.trim()
    const genero = document.getElementById('genero')

    if (titulo !== '' && autor !== '' && anio !== ''){
        libros.push({ titulo, autor, anio, genero })
    } 

    localStorage.setItem('libros', JSON.stringify(libros))

    renderizar_libros()

    document.getElementById('titulo').value = ''
    document.getElementById('autor').value = ''
    document.getElementById('anio').value = ''
}

const buscar_titulo = () =>{

}

const buscar_genero = () =>{

}

const ordenar_libros = () =>{

}

const renderizar_libros = (lista = libros) =>{

    const tabla = document.getElementById('tabla_libros').querySelector('tbody')

    tabla.innerText = ''
    
    lista.forEach(libro => {
        const index = libros.indexOf(auto)

        const fila = document.createElement('tr')

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

        tabla.appendChild(fila)
    })
}