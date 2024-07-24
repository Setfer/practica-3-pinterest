//CATEGORIAS A OBTENER
// COLLECTIONS  https://api.unsplash.com/collections?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g&query=street
//FOTOS ALEATORIAS  https:api.unsplash.com/photos/?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g
//BUSCAR FOTOS   https://api.unsplash.com/search/photos/?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g&query=street


import { link } from './src/Links' //importamos el estilo y codigo de los enlaces
// Añadimos enlaces al header y al footer
let ul = document.createElement('ul')
ul.innerHTML = `${link('Inicio', '', 'link link_header ')}  ${link('Explorar', '','link link_header')}  ${link('Crear', '', 'link link_header')}`
let navbar = document.querySelector('.navbar')
navbar.append(ul)

let social = document.querySelector (".social-links")
social.innerHTML = `${link('Facebook', '', 'link')}  ${link('Twitter', '','link')}  ${link('Instagram', '', 'link')}`


//Funcion para insertar imagenes y sus datos
function insertContent(data) {
  sugerencias.style.display = 'none'
  console.log(data)
  let contenedor = document.querySelector('.contenedor')
  contenedor.innerHTML = ''
  data.forEach((item) => {
    const { likes, links, user, updated_at } = item

    const divContainer = document.createElement('div')
    divContainer.classList.add('item')

    const containerImg = document.createElement('img')
    containerImg.src = links.download
    containerImg.classList.add('image')

    const containerLikes = document.createElement('p')
    containerLikes.innerText = `❤️ ${likes}`
    containerLikes.classList.add('likes')

    const containerName = document.createElement('h3')
    containerName.innerText = user.name
    containerName.classList.add('user-name')

    const containerDate = document.createElement('p')
    containerDate.innerText = new Date(updated_at).toLocaleDateString()
    containerDate.classList.add('date')

    const containerAutor = document.createElement('img')
    containerAutor.src = user.profile_image.medium
    containerAutor.classList.add('autor')

    const infoContainer = document.createElement('div')
    infoContainer.classList.add('info')
    infoContainer.append(containerAutor, containerName, containerDate)

    divContainer.append(containerImg, infoContainer, containerLikes)
    divContainer.insertAdjacentHTML(
      'beforeend',
      `${link('Visitar', '', 'link_visitar')}`
    )
    contenedor.append(divContainer)
  })
}

//se crea y ejecuta la funcion de mostrar la informacion por defecto
const mostrarInfoDefault = async () => {
  fetch(
    'https:api.unsplash.com/photos/?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g&per_page=10'
  )
    .then((response) => response.json())
    .then((data) => {
      insertContent(data)
    })
    .catch((error) => {
      console.log('error', error)
    })
}
mostrarInfoDefault()
//se crea funcion para busquedas de fotos por nombre
const buscarFotoNombre = async (input) => {
  fetch(
    'https://api.unsplash.com/search/photos/?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g&per_page=10&query=' +
      input
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length) {
        insertContent(data.results)
      } else {                        //en el caso de que no se encuentre ningun elemento, muestra sugerencias y muestra gatos
        fetch(
          'https://api.unsplash.com/search/photos/?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g&per_page=10&query=gatos'
        )
          .then((response) => response.json())
          .then((data) => {
            insertContent(data.results)
          })
          .catch((error) => {
            console.log('error', error)
          })

        fetch(
          'https://api.unsplash.com/topics?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g'
        )
          .then((response) => response.json())
          .then((data) => {
            const sugerencias = document.querySelector('#sugerencias')
            sugerencias.style.display = 'block'
            sugerencias.innerHTML = `<p> No se enceontraron resultado, pruebe con ${data[0].title}, ${data[1].title}, ${data[2].title} ,${data[3].title}`
          })
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}

//espertamos a que se termine de cargar el DOM para usar los eventos
document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById('input_header')
  const buttonElement = document.getElementById('button_input')
  const logo = document.querySelector('#logo')
  // Evento para detectar el click en el botón en la busqueda
  buttonElement.addEventListener('click', () => {
    buscarFotoNombre(inputElement.value);
    inputElement.value = ''
  })
  // Evento para detectar el click en el logo y refrescar contenido
logo.addEventListener('click', () => {
  mostrarInfoDefault()
  inputElement.value = ''
})
})
