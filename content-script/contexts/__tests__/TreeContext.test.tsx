import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { TreeProvider, useTree } from '../TreeContext'
import { TEST_treeAndBlobArraySorted } from '../../../testing/testdata/GithubTree'

describe('<TreeProvider>', () => {
  test('renders provider with initial state []', () => {
    const wrapper = ({ children }: ReactChildren) => <TreeProvider> {children} </TreeProvider>
    const { result } = renderHook(() => useTree(), { wrapper })

    expect(result.current.tree).toEqual([])
  })

  test('changes tree to treeAndBlobArraySorted', () => {
    const wrapper = ({ children }: ReactChildren) => <TreeProvider> {children} </TreeProvider>
    const { result } = renderHook(() => useTree(), { wrapper })

    expect(result.current.tree).toEqual([])

    act(() => result.current.setTree(TEST_treeAndBlobArraySorted))

    expect(result.current.tree).toEqual(TEST_treeAndBlobArraySorted)
  })
})
