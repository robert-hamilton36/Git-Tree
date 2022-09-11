import { TEST_blobOnlyArrayUnsorted } from "./GithubTree"
import { TEST_BRANCH, TEST_FetchBranchAPIUrl, TEST_FetchTreeAPIUrl } from "./urls"

export const TEST_FetchTreeTestMessage: IFetchMessage = {
  type: 'fetchTree',
  url: TEST_FetchTreeAPIUrl
}

export const TEST_FetchBranchTestMessage: IFetchMessage = {
  type: 'fetchBranch',
  url: TEST_FetchBranchAPIUrl
}

export const TEST_ReturnBranchTestMessage: IReturnBranchMessage = {
  type: 'branch',
  data: TEST_BRANCH
}

export const TEST_ReturnTreeTestMessage: IReturnTreeMessage = {
  type: 'tree',
  data: TEST_blobOnlyArrayUnsorted
}

export const TEST_ReturnErrorTestMessage: IErrorMessage = {
  type: 'error',
  error: 'something went wrong'
}