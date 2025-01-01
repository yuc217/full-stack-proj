import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show ,setError, setToken}) => {
  const [username, setUsername] = useState('yuchen')
  const [password, setPassword] = useState('secret')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      // setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm