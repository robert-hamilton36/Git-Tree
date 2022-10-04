
/**
 * Creates the nav container and inserts before github content
 * 
 * document.body.children = 
 *         <main> stuff </main>
 * 
 * turns into 
 * 
 * * document.body.children = 
 *     <nav id='GitTree-nav'> </nav>
 *         <main> stuff </main>
 */
// Creates the nav container and inserts before github content
export const addSidebarNav = () => {
  const nav = document.createElement('nav')
  nav.id = 'GitTree-nav'
  document.body.prepend(nav)
}

// Adds a margin left to the document
// This provides space for the navbar to sit 
export const editDocumentBodyMargin = (width:number) => {
  // 48px is the size of sidebars navigator buttons, when open and closed
  const sidebarWidth = width + 48
  const sidebarWidthString = sidebarWidth.toString()
  document.body.style.marginLeft = sidebarWidthString + 'px'
}