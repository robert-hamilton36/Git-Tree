import { sendFetchBranchMessage, sendFetchTreeMessage } from "../sendMessage"
import { blobOnlyArrayUnsorted } from "../../../testing/testdata/GithubTree"
import { FetchTreeTestMessage, FetchBranchTestMessage, ReturnErrorTestMessage, ReturnTreeTestMessage, ReturnBranchTestMessage } from "../../../testing/testdata/Messages"

const MockedBrowserRuntimeSendMessage = browser.runtime.sendMessage as jest.Mock

describe('sendFetchTreeMessage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends and recieves correct data', async () => {
    MockedBrowserRuntimeSendMessage.mockResolvedValue(ReturnTreeTestMessage)

    const data = await sendFetchTreeMessage('robert-hamilton36', 'Git-tree', 'main')

    expect(data).toBe(blobOnlyArrayUnsorted)
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(FetchTreeTestMessage)

  })

  test('handles sendMessage error', async () => {
    MockedBrowserRuntimeSendMessage.mockRejectedValue(ReturnErrorTestMessage)

    try {
      await sendFetchTreeMessage('robert-hamilton36', 'Git-tree', 'main')
    } catch (e) {
      expect(e.type).toBe('error')
      expect(e.error).toBe('something went wrong')
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(FetchTreeTestMessage)
    }
  })
})



describe('sendFetchBranchMessage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends and recieves correct data', async () => {
    MockedBrowserRuntimeSendMessage.mockResolvedValue(ReturnBranchTestMessage)

    const data = await sendFetchBranchMessage('robert-hamilton36', 'Git-tree')

    expect(data).toBe('main')
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(FetchBranchTestMessage)

  })

  test('handles sendMessage error', async () => {
    MockedBrowserRuntimeSendMessage.mockRejectedValue(ReturnErrorTestMessage)

    try {
      await sendFetchBranchMessage('robert-hamilton36', 'Git-tree')
    } catch (e) {
      expect(e.type).toBe('error')
      expect(e.error).toBe('something went wrong')
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(FetchBranchTestMessage)
    }
  })
})
