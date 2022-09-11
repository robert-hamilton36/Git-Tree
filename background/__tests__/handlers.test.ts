import { TEST_blobOnlyArrayUnsorted } from "../../testing/testdata/GithubTree"
import { TEST_ReturnBranchTestMessage, TEST_ReturnErrorTestMessage, TEST_ReturnTreeTestMessage } from "../../testing/testdata/Messages"
import { TEST_BRANCH, TEST_FetchBranchAPIUrl, TEST_FetchTreeAPIUrl } from "../../testing/testdata/urls"
import { fetchBranch, fetchTree } from "../fetch"
import { handleFetchBranch, handleFetchTree } from "../handlers"

jest.mock('../fetch')

const MockFetchBranch = fetchBranch as jest.Mock
const MockFetchTree = fetchTree as jest.Mock

describe('handleFetchBranch()', () => {
  test('it returns a branch message', async () => {
    MockFetchBranch.mockReturnValue(TEST_BRANCH)
    const message = await handleFetchBranch(TEST_FetchBranchAPIUrl)
    expect(message).toEqual(TEST_ReturnBranchTestMessage)
  })

  test('it returns an error message, when it catches a an error with a message', async () => {
    MockFetchBranch.mockRejectedValue({message: 'something went wrong'})
    const message = await handleFetchBranch(TEST_FetchBranchAPIUrl)
    expect(message).toEqual(TEST_ReturnErrorTestMessage)
  })

  test('it returns an error message, when it catches a an error without a message', async () => {
    MockFetchBranch.mockRejectedValue('oh noooooooo')
    const message = await handleFetchBranch(TEST_FetchBranchAPIUrl)
    expect(message).toEqual(TEST_ReturnErrorTestMessage)
  })
})

describe('handleFetchTree()', () => {
  test('it returns a branch message', async () => {
    MockFetchTree.mockReturnValue(TEST_blobOnlyArrayUnsorted)
    const message = await handleFetchTree(TEST_FetchTreeAPIUrl)
    expect(message).toEqual(TEST_ReturnTreeTestMessage)
  })

  test('it returns an error message, when it catches a an error with a message', async () => {
    MockFetchTree.mockRejectedValue({message: 'something went wrong'})
    const message = await handleFetchTree(TEST_FetchTreeAPIUrl)
    expect(message).toEqual(TEST_ReturnErrorTestMessage)
  })

  test('it returns an error message, when it catches a an error without a message', async () => {
    MockFetchTree.mockRejectedValue('oh noooooooo')
    const message = await handleFetchTree(TEST_FetchTreeAPIUrl)
    expect(message).toEqual(TEST_ReturnErrorTestMessage)
  })
})