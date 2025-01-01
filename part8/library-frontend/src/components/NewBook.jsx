import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK, BOOKS_BY_GENRE } from '../queries'


const NewBook = (props, token) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // const [addBook] = useMutation(ADD_BOOK, {
  //   refetchQueries: [{ query: ALL_BOOKS, variables: { genre: null } }, { query: ALL_AUTHORS }],
  
  //     onCompleted: () => {
  //       setPage('books')
  //     },
  //     update: (cache, response) => {
  //       const addedBook = response.data.addBook
  //       updateCacheWith(addedBook, cache)
  //     },
  //   })
    // update: (cache, response) => {
    //   cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    //     return {
    //       allBooks: allBooks.concat(response.data.addBook)
    //     }
    //   }),

    //   cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    //     return {
    //       allAuthors: allAuthors.concat(response.data.addBook.author)
    //     }
    //   })
    // },




const [addBook] = useMutation(ADD_BOOK, {
  refetchQueries: [{ query: ALL_BOOKS, variables: { genre: null } }, { query: ALL_AUTHORS }],
  update: (cache, { data: { addBook } }) => {
 
    const existingBooks = cache.readQuery({ query: ALL_BOOKS });
    const newBooks = {
      allBooks: [...existingBooks.allBooks, addBook],
    };
    cache.writeQuery({ query: ALL_BOOKS, data: newBooks });

    addBook.genres.forEach((genre) => {
      const genreBooks = cache.readQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre },
      });
      if (genreBooks) {
        cache.writeQuery({
          query: BOOKS_BY_GENRE,
          variables: { genre },
          data: {
            allBooks: [...genreBooks.allBooks, addBook],
          },
        });
      } else {
        cache.writeQuery({
          query: BOOKS_BY_GENRE,
          variables: { genre },
          data: {
            allBooks: [addBook],
          },
        });
      }
    });
  }
  // update: (cache, { data: { addBook } }) => {
 
  //   const { allBooks } = cache.readQuery({ query: ALL_BOOKS });
  //   cache.writeQuery({
  //     query: ALL_BOOKS,
  //     data: { allBooks: [...allBooks, addBook] },
  //   });

  //   addBook.genres.forEach((genre) => {
  //     const genreBooks = cache.readQuery({
  //       query: BOOKS_BY_GENRE,
  //       variables: { genre },
  //     });
  //     cache.writeQuery({
  //       query: BOOKS_BY_GENRE,
  //       variables: { genre },
  //       data: {
  //         allBooks: [...genreBooks.allBooks, addBook],
  //       },
  //     });
  //   });

    // const { allAuthors } = cache.readQuery({ query: ALL_AUTHORS });
    // const authorExists = allAuthors.some(
    //   (author) => author.name === addBook.author.name
    // );
    // if (!authorExists) {
    //   cache.writeQuery({
    //     query: ALL_AUTHORS,
    //     data: { allAuthors: [...allAuthors, addBook.author] },
    //   })
    // }
  // },
})


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    addBook({ variables: { title, published: Number(published), author, genres } })
  
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook