/**
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { videoFactory } from '@jaqua/project.de/factories'
import {
  mockedSession,
  provideApolloClient,
  testForNullReturn
} from '@jaqua/shared/util/testing'

import Component, { Props } from './Content'

/* Mocks */
const mockUseSession = jest.fn()
const mockVideoUpdateContent = jest.fn()

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  return {
    __esModule: true,
    ...originalModule,
    useSession: () => mockUseSession()
  }
})
jest.mock('@jaqua/project.de/graphql', () => ({
  useVideoUpdateContentMutation: () => [mockVideoUpdateContent]
}))

/* Setup */
let props: Props
const video = videoFactory.build()
beforeEach(() => {
  props = {
    data: video
  }
})

/* Render */
const renderComponent = (props) =>
  render(provideApolloClient(<Component {...props} />))

/* Tests */
test('should return null if fileId is missing', () => {
  props.data = undefined
  mockUseSession.mockReturnValue(mockedSession('admin'))
  testForNullReturn(renderComponent, props)
})

test('should display title', () => {
  const { getByText } = renderComponent(props)
  expect(getByText(/video 1/i)).toBeInTheDocument()
})

test('should call mutate on click', async () => {
  const user = userEvent.setup()
  const { getByRole } = renderComponent(props)
  const button = getByRole('button', { name: /speichern/i })
  await user.click(button)
  expect(mockVideoUpdateContent).toHaveBeenCalledWith({
    variables: { input: { id: props.data.id, content: props.data.content } }
  })
})
