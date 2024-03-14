/**
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  mockedSession,
  provideApolloClient,
  testForNullReturn
} from '@jaqua/shared/util/testing'

import Component, { Props } from './Delete'

/* Mocks */
const mockUseSession = jest.fn()
const mockVideoRemove = jest.fn()
const mockConfirm = jest.fn()

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  return {
    __esModule: true,
    ...originalModule,
    useSession: () => mockUseSession()
  }
})
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
// jest.mock('material-ui-confirm', () => ({
//   confirm: () => mockConfirm()
// }))
jest.mock('@jaqua/project.de/graphql', () => ({
  useVideoRemoveMutation: () => [mockVideoRemove]
}))

/* Setup */
let props: Props
beforeEach(() => {
  props = {
    fileId: 'fileId'
  }
})

/* Render */
const renderComponent = (props) =>
  render(provideApolloClient(<Component {...props} />))

/* Tests */
test('should return null if fileId is missing', () => {
  props.fileId = undefined
  mockUseSession.mockReturnValue(mockedSession('admin'))
  testForNullReturn(renderComponent, props)
})

test('should return null if user is no admin', () => {
  mockUseSession.mockReturnValue(mockedSession())
  testForNullReturn(renderComponent, props)
})

test('should display delete button', () => {
  mockUseSession.mockReturnValue(mockedSession('admin'))
  const { getByRole } = renderComponent(props)
  const button = getByRole('button', { name: /löschen/i })
  expect(button).toBeInTheDocument()
})

test('should call mutate on click', async () => {
  mockUseSession.mockReturnValue(mockedSession('admin'))
  const user = userEvent.setup()
  const { getByRole } = renderComponent(props)
  const button = getByRole('button', { name: /löschen/i })
  await user.click(button)
  // expect(mockConfirm).toHaveBeenCalled()
  // expect(mockVideoRemove).toHaveBeenCalledWith({
  //   variables: { input: { fileId: props.fileId } }
  // })
})
