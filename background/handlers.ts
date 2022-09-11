import { fetchBranch, fetchTree } from "./fetch"

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