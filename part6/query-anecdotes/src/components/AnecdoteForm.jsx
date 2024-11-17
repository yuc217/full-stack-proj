import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from '../anecdotes'
import { useNotification } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const createAnecdote= useMutation({
    mutationFn: request.createNew,
    onSuccess: (newAnecdote) => { 
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      // notification
      dispatch({ type: 'SHOW', payload: `New anecdote added: '${newAnecdote.content}'` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
      dispatch({ type: 'SHOW', payload: error.message })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (content.length < 5) {
      dispatch({ type: 'SHOW', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
      return
    }

    createAnecdote.mutate(content)
    event.target.anecdote.value = ''

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
