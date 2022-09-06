import React from 'react'
import { render, renderHook } from '@testing-library/react'
import { Providers } from '../Providers'
import { useNavWidth } from '../NavWidthContext'
import { useTree } from '../TreeContext'

describe('<Providers>', () => {
  test('renders all Providers and has access to all contexts', () => {
    const wrapper = ({ children }: ReactChildren) => <Providers> {children} </Providers>
    const { result: navResult } = renderHook(() => useNavWidth(), { wrapper })
    const { result: treeResult } = renderHook(() => useTree(), { wrapper })

    expect(navResult.current.navWidth).toBe(201)
    expect(navResult.current.setNavWidth).toBeTruthy()

    expect(treeResult.current.tree).toEqual([])
    expect(treeResult.current.setTree).toBeTruthy()
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