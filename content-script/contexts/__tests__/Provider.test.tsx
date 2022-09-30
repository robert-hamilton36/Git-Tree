import React from 'react'
import { render, renderHook } from '@testing-library/react'
import { Providers } from '../Providers'
import { useNavWidth } from '../NavWidthContext'
import { useTree } from '../TreeContext'
import { useGitRepo } from '../GitRepoContexts'
import { useUserData } from '../UserContext'

describe('<Providers>', () => {
  test('renders all Providers and has access to all contexts', () => {
    const wrapper = ({ children }: ReactChildren) => <Providers> {children} </Providers>
    const { result: navResult } = renderHook(() => useNavWidth(), { wrapper })
    const { result: treeResult } = renderHook(() => useTree(), { wrapper })
    const { result: gitRepoResult } = renderHook(() => useGitRepo(), { wrapper })
    const { result: userDataResult } = renderHook(() => useUserData(), { wrapper })

    expect(navResult.current.navWidth).toBe(201)
    expect(navResult.current.setNavWidth).toBeTruthy()

    expect(treeResult.current.tree).toEqual([])
    expect(treeResult.current.setTree).toBeTruthy()
    expect(gitRepoResult.current.user).toEqual('')
    expect(gitRepoResult.current.setUser).toBeTruthy()

    expect(gitRepoResult.current.repo).toEqual('')
    expect(gitRepoResult.current.setRepo).toBeTruthy()

    expect(gitRepoResult.current.branch).toEqual('')
    expect(gitRepoResult.current.setBranch).toBeTruthy()

    expect(userDataResult.current.user).toBeUndefined()
    expect(userDataResult.current.setUser).toBeTruthy()
  })
  test('renders children', () => {
    const Children = () => {
      return (
        <div>
          child
        </div>
      )
    }
    
    const { getByText } = render(
      <Providers>
        <Children />
      </Providers>
    )

    const child = getByText('child')
    expect(child).toBeTruthy()
  })
})