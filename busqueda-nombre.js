//se crea funcion para busquedas de fotos por nombre
import { insertContent } from "./main";
export const buscarFotoNombre = async (input) => {
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
            sugerencias.innerHTML = `<p> No se encontraron resultados, pruebe con ${data[0].title}, ${data[1].title}, ${data[2].title} ,${data[3].title}`
          })
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}