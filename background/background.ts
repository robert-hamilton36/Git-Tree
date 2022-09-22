// Background script is only here to make fetch requests 
// This to circumnavigate cors issues when injects fetch requests into a page
// Listens for messages from content-script

import { handleFetchBranch, handleFetchTree, handleLogin, handleLogout } from "./handlers"

const messageListener = async (message: IFetchMessage | ILoginMessage) => {
  if (message.type === 'fetchBranch') {
    return handleFetchBranch(message.url)
  }
  if (message.type === 'fetchTree') {
    return handleFetchTree(message.url)
  }
  if (message.type === 'login') {
    return handleLogin()
  }
  if (message.type === 'logout') {
    return handleLogout()
  }
}

// follows example here
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_a_synchronous_response
browser.runtime.onMessage.addListener(messageListener)

export const TestMessageListener = messageListener