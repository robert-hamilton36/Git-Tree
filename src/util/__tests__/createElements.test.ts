import { addGitPageContainer, addSidebarNav } from "../createElements"

const fakeGitHubPage = 
'<div>' +
  '<header>' +
    'Github' +
  '</header>' +
'</div>' +
'<div>' +
  '<main>' +
    'Repo' +
  '</main>' +
'</div>' +
'<div>' +
  '<footer>' +
    '2020 inc' +
  '</footer>' +
'</div>'


describe('addGitPageContainer()', () => {
  test('adds div to empty body', () => {
    expect(document.getElementById('GitTree-Container')).toBeNull()

    addGitPageContainer()

    const container = document.getElementById('GitTree-Container')
    expect(container).toBeTruthy()
    expect(document.body.innerHTML).toBe('<div id="GitTree-Container" style="flex-grow: 1;"></div>')
  })

  test('adds a div around document.body children', () => {
    document.body.innerHTML = fakeGitHubPage
    expect(document.getElementById('GitTree-Container')).toBeNull()

    addGitPageContainer()

    const container = document.getElementById('GitTree-Container')
    expect(container).toBeTruthy()
    expect(container.innerHTML).toBe(fakeGitHubPage)
  })
})

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