import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"

import { useFetchRepoDetails } from "../useFetchRepoDetails"

import { useGitRepo } from '../../contexts/GitRepoContexts'
import { useTree } from '../../contexts/TreeContext'
import { useUserData } from '../../contexts/UserContext'


import { sendFetchBranchMessage, sendFetchTreeMessage } from '../../util/sendMessage'
import { parseUrl } from '../../util/parseUrl'


import { TEST_blobOnlyArraySorted, TEST_blobOnlyArrayUnsorted } from "../../../testing/testdata/GithubTree"
import { TEST_BRANCH, TEST_REPO, TEST_USER } from "../../../testing/testdata/urls"
import { TEST_APIUserData } from "../../../testing/testdata/GithubUser"

jest.mock('../../contexts/GitRepoContexts')
jest.mock('../../contexts/TreeContext')
jest.mock('../../contexts/UserContext')
jest.mock('../../util/sendMessage')
jest.mock('../../util/parseUrl')

const MockUseGitRepo = useGitRepo as jest.Mock
const MockUseTree = useTree as jest.Mock
const MockUseUserData = useUserData as jest.Mock
const MockSendFetchBranchMessage = sendFetchBranchMessage as jest.Mock
const MockSendFetchTreeMessage = sendFetchTreeMessage as jest.Mock
const MockParseUrl = parseUrl as jest.Mock

const MockSetUserName = jest.fn()
const MockSetRepo = jest.fn()
const MockSetBranch = jest.fn()

const MockUserData = jest.fn()

const MockSetTree = jest.fn()

describe('useFetchRepoDetails()', () => {
  beforeAll(() => {
    MockUseGitRepo.mockReturnValue({ setUserName: MockSetUserName, setRepo: MockSetRepo, setBranch: MockSetBranch })
    MockUseTree.mockReturnValue({ setTree: MockSetTree })
    MockUseUserData.mockReturnValue({ user: MockUserData })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('url with a branch', () => {
    beforeAll(() => {
      MockParseUrl.mockReturnValue({
        userName: TEST_USER, 
        repo: TEST_REPO, 
        branch: TEST_BRANCH 
      })
    })

    test('correctly handles a url with branch', async () => {
      // boilerplate to control when a promise resolves or rejects, so you can test state in between
      const fetchTreeController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakePromise = new Promise((resolve, reject ) => {
        fetchTreeController.resolve = resolve
        fetchTreeController.reject = reject
      })
  
      MockSendFetchTreeMessage.mockReturnValue(fakePromise)
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/username123/GitTree/tree/main'))
  
      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()
  
      expect(MockSetUserName).toHaveBeenCalledTimes(1)
      expect(MockSetUserName).toHaveBeenCalledWith('username123')
  
      expect(MockSetRepo).toHaveBeenCalledTimes(1)
      expect(MockSetRepo).toHaveBeenCalledWith('GitTree')
  
      expect(MockSendFetchBranchMessage).toHaveBeenCalledTimes(0)
  
      expect(MockSetBranch).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledWith('main')
  
      expect(MockSetTree).toHaveBeenCalledTimes(0)
  
      await act(async () => {
        await fetchTreeController.resolve(TEST_blobOnlyArraySorted)
      })
  
      expect(MockSendFetchTreeMessage).toHaveBeenCalledWith('username123', 'GitTree', 'main')
      expect(MockSetTree).toHaveBeenCalledTimes(1)
      expect(MockSetTree).toHaveBeenCalledWith(TEST_blobOnlyArraySorted)
  
      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBeNull()
    })

    test('correctly handles a rejection from fetchTree', async () => {
      // boilerplate to control when a promise resolves or rejects, so you can test state in between
      const fetchTreeController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakePromise = new Promise((resolve, reject ) => {
        fetchTreeController.resolve = resolve
        fetchTreeController.reject = reject
      })
  
      MockSendFetchTreeMessage.mockReturnValue(fakePromise)
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/username123/GitTree/tree/main'))
  
      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()
  
      expect(MockSetUserName).toHaveBeenCalledTimes(1)
      expect(MockSetUserName).toHaveBeenCalledWith('username123')
  
      expect(MockSetRepo).toHaveBeenCalledTimes(1)
      expect(MockSetRepo).toHaveBeenCalledWith('GitTree')
  
      expect(MockSendFetchBranchMessage).toHaveBeenCalledTimes(0)
  
      expect(MockSetBranch).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledWith('main')
  
      expect(MockSetTree).toHaveBeenCalledTimes(0)
  
      await act(async () => {
        await fetchTreeController.reject('Error: fetch error')
      })
  
      expect(MockSendFetchTreeMessage).toHaveBeenCalledWith('username123', 'GitTree', 'main')
      expect(MockSetTree).toHaveBeenCalledTimes(0)
  
      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBe('Error: fetch error')
    })
  })

  describe('url without a branch', () => {
    beforeAll(() => {
      MockParseUrl.mockReturnValue({
        userName: 'username123', 
        repo: 'GitTree', 
        branch: '' 
      })
    })

    test('correctly handles a url without branch', async () => {
      // boilerplate to control when a promise resolves or rejects, so you can test state in between
      const fetchTreeController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakeTreePromise = new Promise((resolve, reject ) => {
        fetchTreeController.resolve = resolve
        fetchTreeController.reject = reject
      })

      const fetchBranchController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakeBranchPromise = new Promise((resolve, reject ) => {
        fetchBranchController.resolve = resolve
        fetchBranchController.reject = reject
      })

      MockSendFetchBranchMessage.mockReturnValue(fakeBranchPromise)
      MockSendFetchTreeMessage.mockReturnValue(fakeTreePromise)
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/username123/GitTree'))

      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()

      expect(MockSetUserName).toHaveBeenCalledTimes(1)
      expect(MockSetUserName).toHaveBeenCalledWith('username123')

      expect(MockSetRepo).toHaveBeenCalledTimes(1)
      expect(MockSetRepo).toHaveBeenCalledWith('GitTree')

      expect(MockSendFetchBranchMessage).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledTimes(0)

      await act(async () => {
        await fetchBranchController.resolve('main')
      })

      expect(MockSetBranch).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledWith('main')

      expect(MockSetTree).toHaveBeenCalledTimes(0)

      await act(async () => {
        await fetchTreeController.resolve(TEST_blobOnlyArraySorted)
      })
      expect(MockSendFetchTreeMessage).toHaveBeenCalledTimes(1)
      expect(MockSendFetchTreeMessage).toHaveBeenCalledWith('username123', 'GitTree', 'main')

      expect(MockSetTree).toHaveBeenCalledTimes(1)
      expect(MockSetTree).toHaveBeenCalledWith(TEST_blobOnlyArraySorted)

      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBeNull()
    })

    test('correctly handles a rejection from sendFetchBranchMessage', async () => {
      // boilerplate to control when a promise resolves or rejects, so you can test state in between
      const fetchTreeController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakeTreePromise = new Promise((resolve, reject ) => {
        fetchTreeController.resolve = resolve
        fetchTreeController.reject = reject
      })

      const fetchBranchController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakeBranchPromise = new Promise((resolve, reject ) => {
        fetchBranchController.resolve = resolve
        fetchBranchController.reject = reject
      })

      MockSendFetchBranchMessage.mockReturnValue(fakeBranchPromise)
      MockSendFetchTreeMessage.mockReturnValue(fakeTreePromise)
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/username123/GitTree'))

      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()

      expect(MockSetUserName).toHaveBeenCalledTimes(1)
      expect(MockSetUserName).toHaveBeenCalledWith('username123')

      expect(MockSetRepo).toHaveBeenCalledTimes(1)
      expect(MockSetRepo).toHaveBeenCalledWith('GitTree')

      expect(MockSendFetchBranchMessage).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledTimes(0)

      await act(async () => {
        await fetchBranchController.reject('Error: fetch error')
      })

      expect(MockSetBranch).toHaveBeenCalledTimes(0)
   
      expect(MockSetTree).toHaveBeenCalledTimes(0)

      await act(async () => {
        await fetchTreeController.resolve(TEST_blobOnlyArraySorted)
      })

      expect(MockSendFetchTreeMessage).toHaveBeenCalledTimes(0)
      expect(MockSetTree).toHaveBeenCalledTimes(0)

      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBe('Error: fetch error')
    })

    test('correctly handles a rejection from sendFetchTreeMessage', async () => {
      // boilerplate to control when a promise resolves or rejects, so you can test state in between
      const fetchTreeController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakeTreePromise = new Promise((resolve, reject ) => {
        fetchTreeController.resolve = resolve
        fetchTreeController.reject = reject
      })

      const fetchBranchController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakeBranchPromise = new Promise((resolve, reject ) => {
        fetchBranchController.resolve = resolve
        fetchBranchController.reject = reject
      })

      MockSendFetchBranchMessage.mockReturnValue(fakeBranchPromise)
      MockSendFetchTreeMessage.mockReturnValue(fakeTreePromise)
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/username123/GitTree'))

      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()

      expect(MockSetUserName).toHaveBeenCalledTimes(1)
      expect(MockSetUserName).toHaveBeenCalledWith('username123')

      expect(MockSetRepo).toHaveBeenCalledTimes(1)
      expect(MockSetRepo).toHaveBeenCalledWith('GitTree')

      expect(MockSendFetchBranchMessage).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledTimes(0)

      await act(async () => {
        await fetchBranchController.resolve('main')
      })

      expect(MockSetBranch).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledWith('main')
    
      expect(MockSetTree).toHaveBeenCalledTimes(0)

      await act(async () => {
        await fetchTreeController.reject('Error: fetch error')
      })

      expect(MockSendFetchTreeMessage).toHaveBeenCalledTimes(1)
      expect(MockSetTree).toHaveBeenCalledTimes(0)

      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBe('Error: fetch error')
    })
  })

  describe('useEffect is run again when dependencies changes', () => {
    beforeAll(() => {
      MockParseUrl.mockReturnValue({
        userName: TEST_USER, 
        repo: TEST_REPO, 
        branch: TEST_BRANCH 
      })
    })

    test('it runs again when user is changed', async () => {
      expect(MockParseUrl).toHaveBeenCalledTimes(0)

      MockUseUserData.mockReturnValue({ user: {}})
      MockSendFetchTreeMessage.mockResolvedValue(TEST_blobOnlyArrayUnsorted)
      renderHook(() => useFetchRepoDetails('https://github.com/username123/GitTree/tree/main'))
     
      expect(MockParseUrl).toHaveBeenCalledTimes(1)

      await act(async () => {
        await MockUseUserData.mockReturnValue({ user: TEST_APIUserData })

      })

      expect(MockParseUrl).toHaveBeenCalledTimes(2)
    })

    test('it runs again when url is changed', async () => {
      expect(MockParseUrl).toHaveBeenCalledTimes(0)

      let url = 'https://github.com/username123/GitTree/tree/main'

      MockUseUserData.mockReturnValue({ user: {}})
      MockSendFetchTreeMessage.mockResolvedValue(TEST_blobOnlyArrayUnsorted)
      renderHook(() => useFetchRepoDetails(url))
     
      expect(MockParseUrl).toHaveBeenCalledTimes(1)

      await act(() => {
        url = ''
      })

      expect(MockParseUrl).toHaveBeenCalledTimes(2)
    })
  })
})

interface PromiseController {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}