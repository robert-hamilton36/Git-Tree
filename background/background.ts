// Background script is only here to make fetch requests 
// This to circumnavigate cors issues when injects fetch requests into a page
// Listens for messages from content-script

import { handleFetchBranch, handleFetchTree } from "./handlers"

export const messageListener = async (message: IFetchMessage) => {
  if (message.type === 'fetchBranch') {
    return handleFetchBranch(message.url)
  }
  if (message.type === 'fetchTree') {
    return handleFetchTree(message.url)
  }
}

// follows example here
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_a_synchronous_response
browser.runtime.onMessage.addListener(messageListener)
