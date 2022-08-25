import { createRoot } from "react-dom/client";
import React from "react";
import App from "./navbar/App"

const getColour = () => {
  const array = ['blue', 'red']
  return array[Math.round(Math.random())]
}

const colour = getColour()

document.body.style.border = `5px solid ${colour}`



const container = document.createElement('div')
container.style.flexGrow = '1'
const children = document.body.innerHTML

container.innerHTML = children

document.body.innerHTML = container.outerHTML


document.body.style.display = 'flex'

const nav = document.createElement('nav')
nav.id= 'nav'
nav.style.height = '100vh'
nav.style.backgroundColor = 'beige'
nav.style.width = '200px'

document.body.prepend(nav)


const getNav = document.getElementById('nav')
console.log(getNav)


const root = createRoot(getNav)
// console.log(root)

root.render(
  <App/>
)

