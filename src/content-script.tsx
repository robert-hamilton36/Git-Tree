import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App"
import { addGitPageContainer, createSidebarNav } from "./util/createElements";

// add flex
document.body.style.display = 'flex'

// containerise the github content
addGitPageContainer()
//creates sidebar
createSidebarNav()

const getNav = document.getElementById('GitTree-nav')

const root = createRoot(getNav)

root.render(
  <App/>
)
