// Background script is only here to make fetch requests 
// This to circumnavigate cors issues when injects fetch requests into a page


// calls githubapi
// `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
// returns tree data

const fetcherBranch = async (url: string) => {
  try {
    const response = await fetch(url)
    const jason = await response.json()
    return(jason.tree) as TreeAPI[]
  } catch (e) {
    console.error
  }
}


// Listens for messages from content-script


// follows example here
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_a_synchronous_response
browser.runtime.onMessage.addListener((message: IMessage) => {
  if (message.type === 'fetch') {
    console.log('return')
    console.log(message.url)
    return fetcherBranch(message.url)
  }
})