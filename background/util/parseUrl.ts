export const parseCodeAndStateFromURL = (redirectURL: string) => {
  const url = new URL(redirectURL)
  const params = url.searchParams

  const returnedState = params.get('state')
  const code = params.get('code')

  return { code, returnedState }
}