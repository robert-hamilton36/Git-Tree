import { parseCodeAndStateFromURL } from "../parseUrl"

import { TEST_AuthCode, TEST_AuthFlowReturnUrl, TEST_AuthState, TEST_RedirectUrl } from "../../../testing/testdata/GithubUser"

describe('parseUrl', () => {
  test('it returns correct state and code', () => {
    const { code, returnedState } = parseCodeAndStateFromURL(TEST_AuthFlowReturnUrl)
    expect(code).toBe(TEST_AuthCode)
    expect(returnedState).toBe(TEST_AuthState)
  })

  test('it returns falsy code value from url with no code', () => {
    const { code, returnedState } = parseCodeAndStateFromURL(TEST_RedirectUrl + '?state=' + TEST_AuthState)
    expect(code).toBeFalsy()
    expect(returnedState).toBe(TEST_AuthState)
  })

  test('it returns falsy state value from url with no state', () => {
    const { code, returnedState } = parseCodeAndStateFromURL(TEST_RedirectUrl + '?code=' + TEST_AuthCode)
    expect(code).toBe(TEST_AuthCode)
    expect(returnedState).toBeFalsy()
  })
})