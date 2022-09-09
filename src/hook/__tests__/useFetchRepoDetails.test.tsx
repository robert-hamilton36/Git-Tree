import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"

import { useFetchRepoDetails } from "../useFetchRepoDetails"

import { useGitRepo } from '../../contexts/GitRepoContexts'
import { useTree } from '../../contexts/TreeContext'

import { sendFetchBranchMessage, sendFetchTreeMessage } from '../../util/sendMessage'
import { parseUrl } from '../../util/parseUrl'


import { blobOnlyArraySorted } from "../../testing/testdata/GithubTree"

jest.mock('../../contexts/GitRepoContexts')
jest.mock('../../contexts/TreeContext')
jest.mock('../../util/sendMessage')
jest.mock('../../util/parseUrl')

const MockUseGitRepo = useGitRepo as jest.Mock
const MockUseTree = useTree as jest.Mock
const MockSendFetchBranchMessage = sendFetchBranchMessage as jest.Mock
const MockSendFetchTreeMessage = sendFetchTreeMessage as jest.Mock
const MockParseUrl = parseUrl as jest.Mock

const MockSetUser = jest.fn()
const MockSetRepo = jest.fn()
const MockSetBranch = jest.fn()

const MockSetTree = jest.fn()

describe('useFetchRepoDetails()', () => {
  beforeAll(() => {
    MockUseGitRepo.mockReturnValue({ setUser: MockSetUser, setRepo: MockSetRepo, setBranch: MockSetBranch })
    MockUseTree.mockReturnValue({ setTree: MockSetTree })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('url with a branch', () => {
    beforeAll(() => {
      MockParseUrl.mockReturnValue({
        user: 'robert-hamilton36', 
        repo: 'GitTree', 
        branch:'main' 
      })
    })

    test('correctly handles a url with branch', async () => {
      const fetchTreeController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakePromise = new Promise((resolve, reject ) => {
        fetchTreeController.resolve = resolve
        fetchTreeController.reject = reject
      })
  
      MockSendFetchTreeMessage.mockReturnValue(fakePromise)
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/robert-hamilton36/GitTree/tree/main'))
  
      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()
  
      expect(MockSetUser).toHaveBeenCalledTimes(1)
      expect(MockSetUser).toHaveBeenCalledWith('robert-hamilton36')
  
      expect(MockSetRepo).toHaveBeenCalledTimes(1)
      expect(MockSetRepo).toHaveBeenCalledWith('GitTree')
  
      expect(MockSendFetchBranchMessage).toHaveBeenCalledTimes(0)
  
      expect(MockSetBranch).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledWith('main')
  
      expect(MockSetTree).toHaveBeenCalledTimes(0)
  
      await act(async () => {
        await fetchTreeController.resolve(blobOnlyArraySorted)
      })
  
      expect(MockSendFetchTreeMessage).toHaveBeenCalledWith('robert-hamilton36', 'GitTree', 'main')
      expect(MockSetTree).toHaveBeenCalledTimes(1)
      expect(MockSetTree).toHaveBeenCalledWith(blobOnlyArraySorted)
  
      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBeNull()
    })

    test('correctly handles a rejection from fetchTree', async () => {
      const fetchTreeController: PromiseController = {
        resolve: () => null,
        reject: () => null 
      }

      const fakePromise = new Promise((resolve, reject ) => {
        fetchTreeController.resolve = resolve
        fetchTreeController.reject = reject
      })
  
      MockSendFetchTreeMessage.mockReturnValue(fakePromise)
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/robert-hamilton36/GitTree/tree/main'))
  
      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()
  
      expect(MockSetUser).toHaveBeenCalledTimes(1)
      expect(MockSetUser).toHaveBeenCalledWith('robert-hamilton36')
  
      expect(MockSetRepo).toHaveBeenCalledTimes(1)
      expect(MockSetRepo).toHaveBeenCalledWith('GitTree')
  
      expect(MockSendFetchBranchMessage).toHaveBeenCalledTimes(0)
  
      expect(MockSetBranch).toHaveBeenCalledTimes(1)
      expect(MockSetBranch).toHaveBeenCalledWith('main')
  
      expect(MockSetTree).toHaveBeenCalledTimes(0)
  
      await act(async () => {
        await fetchTreeController.reject('Error: fetch error')
      })
  
      expect(MockSendFetchTreeMessage).toHaveBeenCalledWith('robert-hamilton36', 'GitTree', 'main')
      expect(MockSetTree).toHaveBeenCalledTimes(0)
  
      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBe('Error: fetch error')
    })
  })

  describe('url without a branch', () => {
    beforeAll(() => {
      MockParseUrl.mockReturnValue({
        user: 'robert-hamilton36', 
        repo: 'GitTree', 
        branch: '' 
      })
    })

    test('correctly handles a url without branch', async () => {
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
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/robert-hamilton36/GitTree'))

      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()

      expect(MockSetUser).toHaveBeenCalledTimes(1)
      expect(MockSetUser).toHaveBeenCalledWith('robert-hamilton36')

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
        await fetchTreeController.resolve(blobOnlyArraySorted)
      })
      expect(MockSendFetchTreeMessage).toHaveBeenCalledTimes(1)
      expect(MockSendFetchTreeMessage).toHaveBeenCalledWith('robert-hamilton36', 'GitTree', 'main')

      expect(MockSetTree).toHaveBeenCalledTimes(1)
      expect(MockSetTree).toHaveBeenCalledWith(blobOnlyArraySorted)

      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBeNull()
    })

    test('correctly handles a rejection from sendFetchBranchMessage', async () => {
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
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/robert-hamilton36/GitTree'))

      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()

      expect(MockSetUser).toHaveBeenCalledTimes(1)
      expect(MockSetUser).toHaveBeenCalledWith('robert-hamilton36')

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
        await fetchTreeController.resolve(blobOnlyArraySorted)
      })

      expect(MockSendFetchTreeMessage).toHaveBeenCalledTimes(0)
      expect(MockSetTree).toHaveBeenCalledTimes(0)

      expect(result.current.loading).toBeFalsy()
      expect(result.current.error).toBe('Error: fetch error')
    })

    test('correctly handles a rejection from sendFetchTreeMessage', async () => {
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
      const { result } = renderHook(() => useFetchRepoDetails('https://github.com/robert-hamilton36/GitTree'))

      expect(result.current.loading).toBeTruthy()
      expect(result.current.error).toBeNull()

      expect(MockSetUser).toHaveBeenCalledTimes(1)
      expect(MockSetUser).toHaveBeenCalledWith('robert-hamilton36')

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
})

interface PromiseController {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}