import { TEST_blobOnlyArraySorted, TEST_blobOnlyArrayUnsorted, TEST_filteredByRoot, TEST_filteredBySrc, TEST_filteredBySrcNavbar, TEST_treeAndBlobArraySorted, TEST_treeAndBlobArrayUnsorted, TEST_treeOnlyArraySorted, TEST_treeOnlyArrayUnsorted } from "../../../testing/testdata/GithubTree";
import { filterTree, TestSorter } from "../filterTree";

describe('sorter()', () => {
  test('returns empty array', () => {
    const array: TreeAPI[] = []
    const sorted = array.sort(TestSorter)
    expect(sorted).toEqual([])
  })

  test('correctly sorts blob only array', () => {
    const sorted = TEST_blobOnlyArrayUnsorted.sort(TestSorter)
    expect(sorted).toEqual(TEST_blobOnlyArraySorted)
  })

  test('correctly sorts tree only array', () => {
    const sorted = TEST_treeOnlyArrayUnsorted.sort(TestSorter)
    expect(sorted).toEqual(TEST_treeOnlyArraySorted)
  })

  test('correctly sorts mixed array', () => {
    const sorted = TEST_treeAndBlobArrayUnsorted.sort(TestSorter)
    expect(sorted).toEqual(TEST_treeAndBlobArraySorted)
  })
})

describe('filterTree', () => {
  test('returns empty array', () => {
    const filtered = filterTree([])
    expect(filtered).toEqual([])
  })

  test("filter By Root '.'", () => {
    const filtered = filterTree(TEST_treeAndBlobArrayUnsorted)
    expect(filtered).toEqual(TEST_filteredByRoot)
  })

  test("filter By src", () => {
    const filtered = filterTree(TEST_treeAndBlobArrayUnsorted, 'src')
    expect(filtered).toEqual(TEST_filteredBySrc)
  })

  test("filter By src/navbar", () => {
    const filtered = filterTree(TEST_treeAndBlobArrayUnsorted, 'src/navbar')
    expect(filtered).toEqual(TEST_filteredBySrcNavbar)
  })

  test("filter By src/tree returns empty array", () => {
    const filtered = filterTree(TEST_treeAndBlobArrayUnsorted, 'src/tree')
    expect(filtered).toEqual([])
  })
})