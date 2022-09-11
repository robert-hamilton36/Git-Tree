import { rest } from 'msw'
import { TEST_blobOnlyArrayUnsorted } from '../testdata/GithubTree'
import { TEST_BRANCH, TEST_FetchBranchAPIUrl, TEST_FetchTreeAPIUrlWithOutQueries } from '../testdata/urls'

export const handlers = [
  rest.get(TEST_FetchTreeAPIUrlWithOutQueries, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tree: TEST_blobOnlyArrayUnsorted
      })
    )
  }),
  rest.get(TEST_FetchBranchAPIUrl, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        default_branch: TEST_BRANCH
      })
    )
  }),
  rest.get('https://api.github.com/fail/fail', (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        message: 'Not Found'
      })
    )
  })
]
