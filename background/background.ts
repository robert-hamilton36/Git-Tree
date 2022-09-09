// Background script is only here to make fetch requests 
// This to circumnavigate cors issues when injects fetch requests into a page


// calls githubapi
// `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
// returns tree data

const fetchTree = async (url: string) => {
  const response = await fetch(url)
  const jason = await response.json()
  return jason.tree as TreeAPI[]
}

// calls githubapi
// `https://api.github.com/repos/${user}/${repo}`
// returns default_branch

const fetchBranch = async (url: string) => {
  const response = await fetch(url)
  const jason = await response.json()
  return jason.default_branch as string
}

const handleFetchBranch = async (url: string) => {
  try {
    const branch = await fetchBranch(url)
    const returnMessage: IReturnBranchMessage = {
      type: 'branch',
      data: branch
    }
    return returnMessage
  } catch (e) {
    const errorMessage: IErrorMessage = {
      type: 'error',
      error: e.message
    }

    return errorMessage
  }
}

const handleFetchTree = async (url: string) => {
  try {
    const tree = await fetchTree(url)
    const returnMessage: IReturnTreeMessage = {
      type: 'tree',
      data: tree
    }
    return returnMessage
  } catch (e) {
    const errorMessage: IErrorMessage = {
      type: 'error',
      error: e.message
    }

    return errorMessage
  }
}


// Listens for messages from content-script


// follows example here
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_a_synchronous_response
browser.runtime.onMessage.addListener(async (message: IFetchMessage) => {
  if (message.type === 'fetchBranch') {
    return handleFetchBranch(message.url)
  }
  if (message.type === 'fetchTree') {
    return handleFetchTree(message.url)
  }
})