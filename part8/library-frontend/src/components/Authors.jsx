import { useQuery, gql, useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import Select from "react-select"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {

  if (!props.show) {
    return null
  }

  const [author, setAuthor] = useState('')
  const [born, setBornYear] = useState('')
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data])


  const { loading, data } = useQuery(ALL_AUTHORS)

  if (loading) {
    return <div>Loading...</div>
  }

  const authors = data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    console.log('update author...')
    editAuthor({ variables: { name: author, setBornTo: Number(born) } })
    setAuthor('')
    setBornYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          {/* <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          /> */}
          <Select
            options={authors.map(a => ({ value: a.name, label: a.name }))}
            value={{ value: author, label: author }}
            onChange={(selectedOption) => setAuthor(selectedOption.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
