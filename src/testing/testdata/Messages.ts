import { blobOnlyArrayUnsorted } from "./GithubTree"

export const FetchTreeTestMessage: IFetchMessage = {
  type: 'fetchTree',
  url: 'https://api.github.com/repos/robert-hamilton36/Git-tree/git/trees/main?recursive=1'
}

export const FetchBranchTestMessage: IFetchMessage = {
  type: 'fetchBranch',
  url: 'https://api.github.com/repos/robert-hamilton36/Git-tree'
}

export const ReturnBranchTestMessage: IReturnBranchMessage = {
  type: 'branch',
  data: 'main'
}

export const ReturnTreeTestMessage: IReturnTreeMessage = {
  type: 'tree',
  data: blobOnlyArrayUnsorted
}

export const ReturnErrorTestMessage: IErrorMessage = {
  type: 'error',
  error: 'something went wrong'
}