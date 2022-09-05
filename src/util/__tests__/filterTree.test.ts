import { blobOnlyArraySorted, blobOnlyArrayUnsorted, filteredByRoot, filteredBySrc, filteredBySrcNavbar, treeAndBlobArraySorted, treeAndBlobArrayUnsorted, treeOnlyArraySorted, treeOnlyArrayUnsorted } from "../../testing/testdata/GithubTree";
import { filterTree, TestSorter } from "../filterTree";

describe('sorter()', () => {
  test('returns empty array', () => {
    const array: TreeAPI[] = []
    const sorted = array.sort(TestSorter)
    expect(sorted).toEqual([])
  })

  test('correctly sorts blob only array', () => {
    const sorted = blobOnlyArrayUnsorted.sort(TestSorter)
    expect(sorted).toEqual(blobOnlyArraySorted)
  })

  test('correctly sorts tree only array', () => {
    const sorted = treeOnlyArrayUnsorted.sort(TestSorter)
    expect(sorted).toEqual(treeOnlyArraySorted)
  })

  test('correctly sorts mixed array', () => {
    const sorted = treeAndBlobArrayUnsorted.sort(TestSorter)
    expect(sorted).toEqual(treeAndBlobArraySorted)
  })
})

describe('filterTree', () => {
  test('returns empty array', () => {
    const filtered = filterTree([])
    expect(filtered).toEqual([])
  })

  test("filter By Root '.'", () => {
    const filtered = filterTree(treeAndBlobArrayUnsorted)
    expect(filtered).toEqual(filteredByRoot)
  })

  test("filter By src", () => {
    const filtered = filterTree(treeAndBlobArrayUnsorted, 'src')
    expect(filtered).toEqual(filteredBySrc)
  })

  test("filter By src/navbar", () => {
    const filtered = filterTree(treeAndBlobArrayUnsorted, 'src/navbar')
    expect(filtered).toEqual(filteredBySrcNavbar)
  })

  test("filter By src/tree returns empty array", () => {
    const filtered = filterTree(treeAndBlobArrayUnsorted, 'src/tree')
    expect(filtered).toEqual([])
  })
})