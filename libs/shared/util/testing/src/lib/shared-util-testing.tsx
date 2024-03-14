/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */
import { ReactElement } from 'react'

import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { RenderResult, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeProvider } from '@mui/material/styles'

import { theme } from '@jaqua/shared/util/theme'

// global.structuredClone = jest.fn((val) => JSON.parse(JSON.stringify(val)))
export const provideTheme = (ui: ReactElement): ReactElement => (
  <ThemeProvider theme={theme}>{ui}</ThemeProvider>
)
export const provideApolloClient = (ui: ReactElement, mocks = []) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {ui}
  </MockedProvider>
)

/**
 * Generate mocked next-auth session object
 * @param key
 * @returns session object
 */
export const mockedSession = (key?: string) => {
  switch (key) {
    case 'admin':
      return {
        data: {
          expires: new Date(Date.now() + 2 * 86400).toISOString(),
          user: { username: 'admin', roles: ['admin', 'editor'] }
        },
        status: 'authenticated'
      }
    default:
      return {
        data: { user: null },
        status: 'unauthenticated'
      }
  }
}

export const testForNullReturn = (
  render: (newProps?: unknown) => RenderResult,
  props: unknown
) => {
  const { container } = render(props)
  expect(container).toBeEmptyDOMElement()
}

export const generateMocks = (mocks: any = [], newMocks: any = []) => {
  newMocks.forEach((m: any, i: number) => {
    if (m?.error) {
      delete mocks[i].result
      mocks[i].error = m.error
    } else mocks[i].result.data = m
  })
  return mocks
}

type Options = {
  user?: boolean
  theme?: boolean
  mocks?: any // never[]
}
export const setup = (jsx: ReactElement, options: Options = {}): any => {
  const { user, theme, mocks } = options
  let comp = mocks ? provideApolloClient(jsx, mocks) : jsx
  comp = theme ? provideTheme(comp) : comp
  return {
    user: user && userEvent.setup(),
    ...render(comp)
  }
}
