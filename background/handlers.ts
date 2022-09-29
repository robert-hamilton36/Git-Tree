import { fetchBranch, fetchTree, fetchUser, getUserData, removeOAuthToken, removeUserData, requestCode, requestOAuthToken } from "./api"

// fetchs data and sends return message

export const handleFetchBranch = async (url: string) => {
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
      error: e.message || 'something went wrong'
    }

    return errorMessage
  }
}

export const handleFetchTree = async (url: string) => {
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
      error: e.message || 'something went wrong'
    }

    return errorMessage
  }
}

export const handleLogin = async () => {
  try {
    const code = await requestCode()
    
    await requestOAuthToken(code)
    const data = await fetchUser()
    
    const message: IReturnUserMessage = {
      type: 'user',
      data
    }

    return message

  } catch (e) {
    const errorMessage: IErrorMessage = {
      type: 'error',
      error: e.message || 'something went wrong'
    }

    return errorMessage
  }
}

export const handleLogout = () => {
  removeUserData()
  removeOAuthToken()
  return 
}

export const handleCheckUser = () => {
  const data = getUserData()
  const message: IReturnUserMessage = {
    type: 'user',
    data
  }
  
  return message
}