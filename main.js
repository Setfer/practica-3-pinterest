//CATEGORIAS A OBTENER
// COLLECTIONS  https://api.unsplash.com/collections?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2
//FOTOS ALEATORIAS  https:api.unsplash.com/photos/?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g
//BUSCAR FOTOS   https://api.unsplash.com/search/photos/?client_id=BOudSlNYPQTOXv1Xn-uYfoGGzzOUjCqkF9mow4E3_2g&query=street


import { link } from './src/links/Links' //importamos el estilo y codigo de los enlaces
import { buscarFotoNombre } from "./busqueda-nombre";
import "./src/header-footer/header-footer"
import "./src/body/item-styles.css"
import "./src/body/media.css"
//Funcion para insertar imagenes y sus datos
export function insertContent(data) {
  sugerencias.style.display = 'none'
  console.log(data)
  let contenedor = document.querySelector('.contenedor')
  contenedor.innerHTML = ''
  data.forEach((item) => {
    const { likes, urls, user, updated_at } = item

    const divContainer = document.createElement('div')
    divContainer.classList.add('item')

    const containerImg = document.createElement('img')
    containerImg.src = urls.small
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
