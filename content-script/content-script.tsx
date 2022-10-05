import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App"
import { addSidebarNav, editDocumentBodyMargin } from "./util/createElements";
import { startingWidth } from "./contexts/NavShowWidthContext";

/**
 * 1 add a left margin to the page
 * 2 inserts the side nav bar before the above container so that it sits inside the left margin
 */


editDocumentBodyMargin(startingWidth)
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
