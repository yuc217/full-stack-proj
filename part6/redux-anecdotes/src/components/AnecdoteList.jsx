import { useDispatch , useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = async(id) => {
        
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(id))
        console.log('vote', id)
        dispatch(setNotification(`you voted! '${anecdote.content}'`,5))
        // dispatch(setNotification(`you voted! '${anecdote.content}'`))
        // setTimeout(() => {
        //     dispatch(clearNotification())
        //   }, 5000) 
    }
    
    // filter
    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )

    // sort by votes
    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList