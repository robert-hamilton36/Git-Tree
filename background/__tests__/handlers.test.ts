import { handleCheckUser, handleFetchBranch, handleFetchTree, handleLogin, handleLogout } from "../handlers"

import { fetchBranch, fetchTree, fetchUser, getUserData, removeOAuthToken, removeUserData, requestCode, requestOAuthToken } from "../api"

import { TEST_blobOnlyArrayUnsorted } from "../../testing/testdata/GithubTree"
import { TEST_ReturnBranchTestMessage, TEST_ReturnErrorTestMessage, TEST_ReturnTreeTestMessage, TEST_ReturnUserMessage } from "../../testing/testdata/Messages"
import { TEST_BRANCH, TEST_FetchBranchAPIUrl, TEST_FetchTreeAPIUrl } from "../../testing/testdata/urls"
import { TEST_CleanedUserData } from "../../testing/testdata/GithubUser"

jest.mock('../api')

const MockFetchBranch = fetchBranch as jest.Mock
const MockFetchTree = fetchTree as jest.Mock
const MockFetchUser = fetchUser as jest.Mock
const MockRequestCode = requestCode as jest.Mock
const MockRequestOAuthToken = requestOAuthToken as jest.Mock
const MockRemoveOAuthToken = removeOAuthToken as jest.Mock
const MockRemoveUserData = removeUserData as jest.Mock
const MockGetUserData = getUserData as jest.Mock

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
  test('it returns a tree message', async () => {
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

describe('handleLogin()', () => {
  test('it returns a user message', async () => {
    MockRequestCode.mockReturnValue('asednksda')
    MockRequestOAuthToken.mockImplementation(() => {return})
    MockFetchUser.mockReturnValue(TEST_CleanedUserData)
    const message = await handleLogin()
    expect(message).toEqual(TEST_ReturnUserMessage)
  })

  test('it returns an error message when requestCode rejects', async () => {
    MockRequestCode.mockRejectedValue({message: 'something went wrong'})
    const message = await handleLogin()
    expect(message).toEqual(TEST_ReturnErrorTestMessage)
  })

  test('it returns an error message when requestOAuthToken rejects', async () => {
    MockRequestCode.mockReturnValue('asednksda')
    MockRequestOAuthToken.mockRejectedValue({message: 'something went wrong'})
    const message = await handleLogin()
    expect(message).toEqual(TEST_ReturnErrorTestMessage)
  })

  test('it returns an error message when fetchUser rejects', async () => {
    MockRequestCode.mockReturnValue('asednksda')
    MockRequestOAuthToken.mockImplementation(() => {return})
    MockFetchUser.mockRejectedValue({message: 'something went wrong'})
    const message = await handleLogin()
    expect(message).toEqual(TEST_ReturnErrorTestMessage)
  })

  test('it returns an error message, when it catches a an error without a message', async () => {
    MockRequestCode.mockRejectedValue('oh no')
    const message = await handleLogin()
    expect(message).toEqual(TEST_ReturnErrorTestMessage)
  })
})

describe('handleLogout()', () => {
  test('it calls the correct functions', () => {
    expect(MockRemoveOAuthToken).toHaveBeenCalledTimes(0)
    expect(MockRemoveUserData).toHaveBeenCalledTimes(0)
    handleLogout()
    expect(MockRemoveOAuthToken).toHaveBeenCalledTimes(1)
    expect(MockRemoveUserData).toHaveBeenCalledTimes(1)
  })
})

describe('handleCheckUser()', () => {
  test('it returns a user message', () => {
    MockGetUserData.mockReturnValue(TEST_CleanedUserData)
    const message = handleCheckUser()
    expect(message).toEqual(TEST_ReturnUserMessage)
  })
})