import 'jest-webextension-mock'
import 'whatwg-fetch'

// jest-webextension-mock is missing identity api
// this adds it in

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
browser.identity = {
  getRedirectURL: jest.fn(),
  launchWebAuthFlow:jest.fn()
}