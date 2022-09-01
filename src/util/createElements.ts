
// Creates a div and puts the regular github content inside this div
export const addGitPageContainer = () => {
  const container = document.createElement('div')
  container.id = 'insertedContainer'
  container.style.flexGrow = '1'

  const children = document.body.childNodes
  
  container.append(...Array.from(children))

  document.body.appendChild(container)
}

// Creates the nav container and inserts before github content
export const addSidebarNav = () => {
  const nav = document.createElement('nav')
  nav.id = 'GitTree-nav'
  document.body.prepend(nav)
}