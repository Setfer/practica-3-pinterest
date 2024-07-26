import "./header-footer-styles.css"

import { link } from '../links/Links' //importamos el estilo y codigo de los enlaces
// Añadimos enlaces al header y al footer
let ul = document.createElement('ul')
ul.innerHTML = ` <li>${link('Inicio', '', 'link link_header')}</li>
  <li>${link('Explorar', '', 'link link_header')}</li>
  <li>${link('Crear', '', 'link link_header')}</li>`
let navbar = document.querySelector('.navbar')
navbar.append(ul)

let social = document.querySelector (".social-links")
social.innerHTML = `<li>${link('Facebook', '', 'link')}</li>  <li>${link('Twitter', '','link')}</li>  <li>${link('Instagram', '', 'link')}</li>`
