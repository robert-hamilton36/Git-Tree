export const sendFetchTreeMessage = async (user: string, repo: string, branch: string): Promise<TreeAPI[]> => {
  const message: IFetchMessage = {
    type: 'fetchTree',
    url: `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
  }

  const response = await browser.runtime.sendMessage(message) as IReturnTreeMessage | IErrorMessage

  if (response.type === 'error') {
    throw response.error
  }
  return response.data
}

export const sendFetchBranchMessage = async (user: string, repo: string) => {
  const message: IFetchMessage = {
    type: 'fetchBranch',
    url: `https://api.github.com/repos/${user}/${repo}`
  }
  
  const response = await browser.runtime.sendMessage(message) as IReturnBranchMessage | IErrorMessage

  if (response.type === 'error') {
    throw response.error
  }
  return response.data
}

export const sendLoginMessage = async () => {
  const message: ILoginMessage = {
    type: 'login'
  }

  const response = await browser.runtime.sendMessage(message) as IReturnUserMessage | IErrorMessage

  if (response.type === 'error') {
    throw response.error
  }
  return response.data
}

export const sendLogoutMessage = async () => {
  const message: ILogoutMessage = {
    type: 'logout'
  }

  await browser.runtime.sendMessage(message)

  return
}