/**
 *  Creates a div and puts the regular github content inside this div
 * 
 *  document.body.children = <main> stuff </main>
 * 
 * turns into
 * 
 *  document.body.children = 
 *     <div id='GitTree-Container'>
 *         <main> stuff </main>
 *     </div>
 *  
 */

export const addGitPageContainer = () => {
  const container = document.createElement('div')
  container.id = 'GitTree-Container'
  container.style.flexGrow = '1'

  const children = document.body.childNodes
  
  container.append(...Array.from(children))

  document.body.appendChild(container)
}

/**
 * Creates the nav container and inserts before github content
 * 
 * document.body.children = 
 *     <div id='GitTree-Container'>
 *         <main> stuff </main>
 *     </div>
 * 
 * turns into 
 * 
 * * document.body.children = 
 *     <nav id='GitTree-nav'> </nav>
 *     <div id='GitTree-Container'>
 *         <main> stuff </main>
 *     </div>
 */
// Creates the nav container and inserts before github content
export const addSidebarNav = () => {
  const nav = document.createElement('nav')
  nav.id = 'GitTree-nav'
  document.body.prepend(nav)
}