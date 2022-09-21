import { rest } from 'msw'
import { SCOPE } from '../../env'
import { TEST_blobOnlyArrayUnsorted } from '../testdata/GithubTree'
import { TEST_APIUserData, TEST_AuthCode, TEST_OAuthToken } from '../testdata/GithubUser'
import { TEST_BRANCH, TEST_FetchBranchAPIUrl, TEST_FetchPrivateBranchAPIUrl, TEST_FetchPrivateTreeAPIUrlWithOutQueries, TEST_FetchTreeAPIUrlWithOutQueries } from '../testdata/urls'

export const handlers = [
  rest.get(TEST_FetchTreeAPIUrlWithOutQueries, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tree: TEST_blobOnlyArrayUnsorted
      })
    )
  }),
  rest.get(TEST_FetchPrivateTreeAPIUrlWithOutQueries, (req, res, ctx) => {
    const authHeader = req.headers.get('authorization')
    if (authHeader.includes(TEST_OAuthToken)) {
      return res(
        ctx.status(200),
        ctx.json({
          tree: TEST_blobOnlyArrayUnsorted
        })
      )
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'Not Found'
        })
      )
    }
  }),
  rest.get(TEST_FetchBranchAPIUrl, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        default_branch: TEST_BRANCH
      })
    )
  }),
  rest.get(TEST_FetchPrivateBranchAPIUrl, (req, res, ctx) => {
    const authHeader = req.headers.get('authorization')
    if (authHeader.includes(TEST_OAuthToken)) {
      return res(
        ctx.status(200),
        ctx.json({
          default_branch: TEST_BRANCH
        })
      )
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'Not Found'
        })
      )
    }
  }),
  rest.get('https://api.github.com/repos/fail/fail', (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        message: 'Not Found'
      })
    )
  }),
  rest.get('https://api.github.com/repos/empty/nodata', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'accepted but sends no data'
      })
    )
  }),
  rest.get('https://api.github.com/user', (req, res, ctx) => {
    const authHeader = req.headers.get('authorization')
    if (authHeader.includes(TEST_OAuthToken)) {
      return res(
        ctx.status(200),
        ctx.json({
          ...TEST_APIUserData
        })
      )
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'Not Found'
        })
      )
    }
  }),
  rest.post('https://github.com/login/oauth/access_token/', (req, res, ctx) => {
    if (req.url.searchParams.get('code') === TEST_AuthCode) {
      return res(
        ctx.status(200),
        ctx.json({
          access_token: TEST_OAuthToken,
          token_type: "bearer",
          scope: SCOPE
        })
      )
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          error: "bad_verification_code",
          error_description: "The code passed is incorrect or expired.",
          error_uri: "https://docs.github.com/en/developers/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors#bad-verification-code"
        })
      )
    }
  })
]
