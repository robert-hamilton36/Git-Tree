import { fetchBranch, fetchTree, fetchUser, removeOAuthToken, requestCode, requestOAuthToken, TESTING_GetAuthToken, TESTING_SetAuthToken } from "../api"

import { v4 as uuidv4 } from 'uuid'
import { parseCodeAndStateFromURL } from "../util/parseUrl"

import { TEST_FetchBranchAPIUrl, TEST_FetchPrivateBranchAPIUrl, TEST_FetchPrivateTreeAPIUrl, TEST_FetchTreeAPIUrl } from "../../testing/testdata/urls"
import { TEST_blobOnlyArrayUnsorted } from "../../testing/testdata/GithubTree"
import { TEST_AuthCode, TEST_AuthFlowReturnUrl, TEST_AuthState, TEST_CleanedUserData, TEST_OAuthToken, TEST_RedirectUrl } from "../../testing/testdata/GithubUser"

jest.mock('uuid')
jest.mock("../util/parseUrl")

const MockedV4 = uuidv4 as jest.Mock
const MockedParseCodeAndStateFromURL = parseCodeAndStateFromURL as jest.Mock

const MockedBrowserIdentityGetRedirectUrl = browser.identity.getRedirectURL as jest.Mock
const MockedBrowserIdentityLaunchWebAuthFlow = browser.identity.launchWebAuthFlow as jest.Mock

describe('fetchTree', () => {
  afterAll(() => {
    TESTING_SetAuthToken(undefined)
  })

  test('returns public Tree', async () => {
    const Tree = await fetchTree(TEST_FetchTreeAPIUrl)
    expect(Tree).toEqual(TEST_blobOnlyArrayUnsorted)
  })

  test('returns private Tree', async () => {
    TESTING_SetAuthToken(TEST_OAuthToken)
    const Tree = await fetchTree(TEST_FetchPrivateTreeAPIUrl)
    expect(Tree).toEqual(TEST_blobOnlyArrayUnsorted)

  })

  test('returns error on non 200 response', async () => {
    try {
      await fetchTree('https://api.github.com/repos/fail/fail')      
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e).toBe('Not Found')
    }
  })

  test('returns error on unauthorized fetch', async () => {
    TESTING_SetAuthToken(undefined)
    try {
      await fetchTree(TEST_FetchPrivateTreeAPIUrl)      
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e).toBe('Not Found')
    }
  })

  test('returns error on response with no tree data', async () => {
    try {
      await fetchTree('https://api.github.com/repos/empty/nodata')   
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e).toBe('No data recieved')
    }
  })
})

describe('fetchBranch', () => {
  afterAll(() => {
    TESTING_SetAuthToken(undefined)
  })

  test('returns default branch', async () => {
    const branch = await fetchBranch(TEST_FetchBranchAPIUrl)
    expect(branch).toBe('main')
  }
  )

  test('returns default private branch', async () => {
    TESTING_SetAuthToken(TEST_OAuthToken)
    const branch = await fetchBranch(TEST_FetchPrivateBranchAPIUrl)
    expect(branch).toBe('main')
  })

  test('returns error on non 200 response', async () => {
    try {
      await fetchBranch('https://api.github.com/repos/fail/fail')    
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e).toBe('Not Found')
    }
  })

  test('returns error on unauthorized fetch', async () => {
    TESTING_SetAuthToken(undefined)
    try {
      await fetchTree(TEST_FetchPrivateBranchAPIUrl)   
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e).toBe('Not Found')
    }
  })

  test('returns error on response with no tree data', async () => {
    try {
      await fetchBranch('https://api.github.com/repos/empty/nodata')   
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e).toBe('No data recieved')
    }
  })
})

describe('fetchUser', () => {
  afterAll(() => {
    TESTING_SetAuthToken(undefined)
  })

  test('returns user data with OAuthToken', async () => {
    TESTING_SetAuthToken(TEST_OAuthToken)
    const userData = await fetchUser()
    expect(userData).toEqual(TEST_CleanedUserData)
  })

  test('returns error without OAuthToken', async () => {
    TESTING_SetAuthToken(undefined)
    try {
      await fetchUser()    
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e).toBe('Need authentication')
    }
  })
})

describe('requestCode', () => {
  beforeAll(() => {
    MockedV4.mockReturnValue(TEST_AuthState)
    MockedBrowserIdentityGetRedirectUrl.mockReturnValue(TEST_RedirectUrl)
    MockedBrowserIdentityLaunchWebAuthFlow.mockResolvedValue(TEST_AuthFlowReturnUrl)
    MockedParseCodeAndStateFromURL.mockReturnValue({ code: TEST_AuthCode, returnedState: TEST_AuthState})
  })

  test('returns code', async () => {
    const code = await requestCode()
    expect(code).toBe(TEST_AuthCode)
  })

  test('returns state mismatch error', async () => {
    MockedParseCodeAndStateFromURL.mockReturnValueOnce({ code: TEST_AuthCode, returnedState: 'wrong'})

    try {
      await requestCode()      
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e.message).toBe('state mismatch')
    }
  })

  test('returns error', async () => {
    MockedBrowserIdentityLaunchWebAuthFlow.mockRejectedValue('rejected')

    try {
      await requestCode()     
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e).toBe('rejected')
    }
  })
})

describe('requestOAuthToken', () => {
  afterEach(() => {
    TESTING_SetAuthToken(undefined)
  })

  test('returns OAuthToken', async () => {
    let token = TESTING_GetAuthToken()
    expect(token).toBeUndefined()
    await requestOAuthToken(TEST_AuthCode)
    token = TESTING_GetAuthToken()
    expect(token).toBe(TEST_OAuthToken)
  })

  test('returns error', async () => {
    let token = TESTING_GetAuthToken()
    expect(token).toBeUndefined()
    try {
      await requestOAuthToken(null)     
      // code should never make it here, incase it does force test to fail      
      expect(true).toBeFalsy()
    } catch(e) {
      expect(e.message).toBe("bad_verification_code")
      token = TESTING_GetAuthToken()
      expect(token).toBeUndefined()
    }
  })
})

describe('removeOAuthToken', () => {
  it("sets the auth token to '' an empty string", () => {
    TESTING_SetAuthToken(TEST_OAuthToken)
    const token = TESTING_GetAuthToken()
    expect(token).toBe(TEST_OAuthToken)

    removeOAuthToken()

    const newToken = TESTING_GetAuthToken()
    expect(newToken).toBe('')
  })
})