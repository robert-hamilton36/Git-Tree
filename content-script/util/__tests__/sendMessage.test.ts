import { sendCheckUserMessage, sendFetchBranchMessage, sendFetchTreeMessage, sendLoginMessage, sendLogoutMessage } from "../sendMessage"
import { TEST_blobOnlyArrayUnsorted } from "../../../testing/testdata/GithubTree"
import { TEST_FetchTreeTestMessage, TEST_FetchBranchTestMessage, TEST_ReturnErrorTestMessage, TEST_ReturnTreeTestMessage, TEST_ReturnBranchTestMessage, TEST_ReturnUserMessage, TEST_LoginTestMessage, TEST_LogoutTestMessage, TEST_CheckCurrentUserTestMessage } from "../../../testing/testdata/Messages"
import { TEST_BRANCH, TEST_REPO, TEST_USER } from "../../../testing/testdata/urls"
import { TEST_CleanedUserData } from "../../../testing/testdata/GithubUser"

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
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
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
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch (e) {
      expect(e.type).toBe('error')
      expect(e.error).toBe('something went wrong')
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_FetchBranchTestMessage)
    }
  })
})

describe('sendLoginMessage()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends and recieves correct data', async () => {
    MockedBrowserRuntimeSendMessage.mockResolvedValue(TEST_ReturnUserMessage)

    const data = await sendLoginMessage()

    expect(data).toEqual(TEST_CleanedUserData)

    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_LoginTestMessage)
  })

  test('handles sendMessage error', async () => {
    MockedBrowserRuntimeSendMessage.mockRejectedValue(TEST_ReturnErrorTestMessage)

    try {
      await sendLoginMessage()

      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e.type).toBe('error')
      expect(e.error).toBe('something went wrong')
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_LoginTestMessage)
    }
  })
})

describe('sendLogoutMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('it calls the right functions', async () => {
    MockedBrowserRuntimeSendMessage.mockResolvedValue(undefined)

    const response = await sendLogoutMessage()

    expect(response).toBeUndefined()
    expect(MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
    expect(MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_LogoutTestMessage)
  })
})

describe('sendcheckUserMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends and recieves the correct data', async () => {
    MockedBrowserRuntimeSendMessage.mockResolvedValue(TEST_ReturnUserMessage)
    const data = await sendCheckUserMessage()

    expect(data).toEqual(TEST_CleanedUserData)

    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
    expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_CheckCurrentUserTestMessage)
  })

  test('handles sendMessage error', async () => {
    MockedBrowserRuntimeSendMessage.mockRejectedValue(TEST_ReturnErrorTestMessage)

    try {
      await sendLoginMessage()

      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e.type).toBe('error')
      expect(e.error).toBe('something went wrong')
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledTimes(1)
      expect( MockedBrowserRuntimeSendMessage).toHaveBeenCalledWith(TEST_LoginTestMessage)
    }
  })
})
