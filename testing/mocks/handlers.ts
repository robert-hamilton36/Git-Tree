import { rest } from 'msw'
import { TEST_blobOnlyArraySorted } from '../testdata/GithubTree'
import { TEST_BRANCH, TEST_FetchBranchAPIUrl, TEST_FetchTreeAPIUrlWithOutQueries } from '../testdata/urls'

export const handlers = [
  rest.get(TEST_FetchTreeAPIUrlWithOutQueries, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tree: TEST_blobOnlyArraySorted
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
]
