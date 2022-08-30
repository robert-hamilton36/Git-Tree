
// Creates a div and puts the regular github content inside this div
export const addGitPageContainer = () => {
  const container = document.createElement('div')
  container.id = 'insertedContainer'
  container.style.flexGrow = '1'

  const children = document.body.childNodes
  
  container.append(...Array.from(children))

  document.body.appendChild(container)
}

// Undos addGitPageContainer
export const removeGitPageContainer = () => {
  const container = document.getElementById('insertedContainer')
  document.body.style.display = 'block'
  container.replaceWith(...Array.from(container.childNodes))
}

// Creates the nav container and inserts before github content
export const createSidebarNav = () => {
  const nav = document.createElement('nav')
  nav.id = 'GitTree-Nav'
  document.body.prepend(nav)
}