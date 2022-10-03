import { TestMessageListener } from "../background"

import { handleCheckUser, handleFetchBranch, handleFetchTree, handleLogin, handleLogout } from "../handlers"

import { TEST_CheckCurrentUserTestMessage, TEST_FetchBranchTestMessage, TEST_LoginTestMessage, TEST_LogoutTestMessage, TEST_ReturnBranchTestMessage, TEST_ReturnTreeTestMessage, TEST_ReturnUserMessage } from "../../testing/testdata/Messages"

jest.mock('../handlers')

const MockHandleFetchBranch = handleFetchBranch as jest.Mock
const MockHandleFetchTree = handleFetchTree as jest.Mock
const MockHandleLogin = handleLogin as jest.Mock
const MockHandleLogout = handleLogout as jest.Mock
const MockHandleCheckUser = handleCheckUser as jest.Mock

describe('messageListener', () => {
  test('it handles a fetchBranch message', async () => {
    MockHandleFetchBranch.mockResolvedValue(TEST_ReturnBranchTestMessage)
    const message = await TestMessageListener(TEST_FetchBranchTestMessage)

    expect(message).toEqual(TEST_ReturnBranchTestMessage)
  })

  test('it handles a fetchTree message', async () => {
    MockHandleFetchTree.mockResolvedValue(TEST_ReturnTreeTestMessage)
    const message = await TestMessageListener(TEST_FetchBranchTestMessage)

    expect(message).toEqual(TEST_ReturnBranchTestMessage)
  })

  test('it handles a login message', async () => {
    MockHandleLogin.mockResolvedValue(TEST_ReturnUserMessage)
    const message = await TestMessageListener(TEST_LoginTestMessage)

    expect(message).toEqual(TEST_ReturnUserMessage)
  })

  test('it handles a logout message', async () => {
    expect(MockHandleLogout).toHaveBeenCalledTimes(0)
    const returned = await TestMessageListener(TEST_LogoutTestMessage)
    expect(returned).toBeFalsy()
    expect(MockHandleLogout).toHaveBeenCalledTimes(1)
  })

  test('it handels a currentUser message', async () => {
    MockHandleCheckUser.mockResolvedValue(TEST_ReturnUserMessage)
    expect(MockHandleCheckUser).toHaveBeenCalledTimes(0)

    const message = await TestMessageListener(TEST_CheckCurrentUserTestMessage)
    expect(message).toEqual(TEST_ReturnUserMessage)

    expect(MockHandleCheckUser).toHaveBeenCalledTimes(1)
  })
})