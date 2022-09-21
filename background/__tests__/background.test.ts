import { TestMessageListener } from "../background"

import { handleFetchBranch, handleFetchTree, handleLogin } from "../handlers"

import { TEST_FetchBranchTestMessage, TEST_LoginTestMessage, TEST_ReturnBranchTestMessage, TEST_ReturnTreeTestMessage, TEST_ReturnUserMessage } from "../../testing/testdata/Messages"

jest.mock('../handlers')

const MockHandleFetchBranch = handleFetchBranch as jest.Mock
const MockHandleFetchTree = handleFetchTree as jest.Mock
const MockHandleLogin = handleLogin as jest.Mock

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
})