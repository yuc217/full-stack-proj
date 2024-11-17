import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from './anecdotes'
import { useNotification } from './components/NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const voteAnecdote = useMutation({
    mutationFn: ({ id, updatedAnecdote }) => request.updateVotes(id, updatedAnecdote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: request.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteAnecdote.mutate({ id: anecdote.id, updatedAnecdote })

    // notification
    dispatch({ type: 'SHOW', payload: `you voted! '${anecdote.content}'` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote services not available due to problem in the server.</div>;
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}


    </div>
  )
}

export default App
