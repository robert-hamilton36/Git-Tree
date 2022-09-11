import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App"
import { addGitPageContainer, addSidebarNav } from "./util/createElements";

/**
 * 1 set body to be flex
 * 2 add container around githubs content, the only child of document.body
 * 3 inserts the side nav bar before the above container
 */

document.body.style.display = 'flex'
addGitPageContainer()
addSidebarNav()

/**
* popstate happens whenever the back or forwards button is pressed
* when this happens the react app looses reactivity
* so these listeners fix that
*/

// removes react app on back of forward button press
window.addEventListener('popstate', () => {
  root.unmount()
})


// event is called whenever data is rendered by turbo
// twice when data has been cached (loading cached data/ refreshing data)
// this checks for react app, if it doesn't exist render it again
document.addEventListener('turbo:render', () => {
  const getNav = document.getElementById('GitTree-nav')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!root._internalRoot) {
    root = createRoot(getNav)
    root.render(<App />)
  }

})


// first render of react app
const getNav = document.getElementById('GitTree-nav')
let root = createRoot(getNav)

root.render(
  <App/>
)
