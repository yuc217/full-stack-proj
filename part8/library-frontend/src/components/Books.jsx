import { useQuery, gql } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries"

const Books = (props) => {
  // const { loading, data } = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const { loading: allBooksLoading, data: allBooksData } = useQuery(ALL_BOOKS)
  const { loading: genreBooksLoading, data: genreBooksData } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre }
  })

  if (!props.show) {
    return null
  }
  if (allBooksLoading || genreBooksLoading) {
    return <div>Loading...</div>
  }
  const books = selectedGenre === "all" ? allBooksData.allBooks : genreBooksData.allBooks

  // get all genres
  const genres = [...new Set(allBooksData.allBooks.flatMap(book => book.genres))]
  // console.log("genres", genres)

  // // filter
  // const filteredBooks = selectedGenre === "all"
  //   ? books
  //   : books.filter((book) => book.genres.includes(selectedGenre))

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setSelectedGenre("all")}>all</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
