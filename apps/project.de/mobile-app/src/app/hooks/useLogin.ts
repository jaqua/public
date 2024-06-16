import { gql, useMutation } from '@apollo/client'

const LOGIN_MUTATION = gql`
  mutation Login($input: UserInput!) {
    login(input: $input) {
      access_token
    }
  }
`

const useLogin = () => {
  return useMutation(LOGIN_MUTATION)
}

export default useLogin
