import { sendFetchBranchMessage, sendFetchTreeMessage } from "../sendMessage"
import { TEST_blobOnlyArrayUnsorted } from "../../../testing/testdata/GithubTree"
import { TEST_FetchTreeTestMessage, TEST_FetchBranchTestMessage, TEST_ReturnErrorTestMessage, TEST_ReturnTreeTestMessage, TEST_ReturnBranchTestMessage } from "../../../testing/testdata/Messages"
import { TEST_BRANCH, TEST_REPO, TEST_USER } from "../../../testing/testdata/urls"

const MockedBrowserRuntimeSendMessage = browser.runtime.sendMessage as jest.Mock

describe('sendFetchTreeMessage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends and recieves correct data', async () => {
    MockedBrowserRuntimeSendMessage.mockResolvedValue(TEST_ReturnTreeTestMessage)

    const data = await sendFetchTreeMessage(TEST_USER, TEST_REPO, TEST_BRANCH)

    expect(data).toBe(TEST_blobOnlyArrayUnsorted)
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_FetchTreeTestMessage)

  })

  test('handles sendMessage error', async () => {
    MockedBrowserRuntimeSendMessage.mockRejectedValue(TEST_ReturnErrorTestMessage)

    try {
      await sendFetchTreeMessage(TEST_USER, TEST_REPO, TEST_BRANCH)
    } catch (e) {
      expect(e.type).toBe('error')
      expect(e.error).toBe('something went wrong')
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_FetchTreeTestMessage)
    }
  })
})



describe('sendFetchBranchMessage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends and recieves correct data', async () => {
    MockedBrowserRuntimeSendMessage.mockResolvedValue(TEST_ReturnBranchTestMessage)

    const data = await sendFetchBranchMessage(TEST_USER, TEST_REPO)

    expect(data).toBe('main')
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_FetchBranchTestMessage)

  })

  test('handles sendMessage error', async () => {
    MockedBrowserRuntimeSendMessage.mockRejectedValue(TEST_ReturnErrorTestMessage)

    try {
      await sendFetchBranchMessage(TEST_USER, TEST_REPO)
    } catch (e) {
      expect(e.type).toBe('error')
      expect(e.error).toBe('something went wrong')
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_FetchBranchTestMessage)
    }
  })
})
