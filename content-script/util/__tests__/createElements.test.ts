import { sidebarWidth } from "../../navbar/Sidebar"
import { addSidebarNav, editDocumentBodyMargin } from "../createElements"

describe('addSidebarNav()', () => {
  test('adds a sidebar before the rest of document.body children', () => {
    document.body.innerHTML = '<div></div>'
    expect(document.getElementById('GitTree-nav')).toBeNull()
    
    addSidebarNav()

    const container = document.getElementById('GitTree-nav')
    expect(container).toBeTruthy()
    expect(document.body.innerHTML).toBe('<nav id="GitTree-nav"></nav><div></div>')
  })
})

describe('editDocumentBodyMargin()', () => {
  test('it changes the left margin of body.document', () => {
    expect(document.body.style.marginLeft).toBe('')

    editDocumentBodyMargin(400)

    expect(document.body.style.marginLeft).toBe(400 + sidebarWidth +'px')
  })
})